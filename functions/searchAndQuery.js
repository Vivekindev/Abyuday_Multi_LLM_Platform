import { google } from 'googleapis';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import rateLimit from 'axios-rate-limit';
import axios from 'axios';

dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;
const googleCseId = process.env.GOOGLE_CSE_ID;
const geminiApiKey = process.env.GEMINI_API_KEY_1;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-latest',
  systemInstruction: 'you are an assistant, If asked real time data or current time data, tell according to the data provided',
});

const generationConfig = {
  temperature: 0.2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Perform a search query
const googleSearch = async (query) => {
  const customsearch = google.customsearch('v1');
  try {
    const res = await customsearch.cse.list({
      auth: googleApiKey,
      cx: googleCseId,
      q: query,
    });
    return res.data.items;
  } catch (error) {
    console.error('Error during search:', error);
  }
};

// Create a rate-limited Axios instance
const http = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000 });

// Scrape content from a URL using Puppeteer
const scrapeContent = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true, // Set to false if you want to see the browser in action
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    
    // Disable loading images and CSS for faster scraping
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, {
      waitUntil: 'networkidle2', // Wait for network to be idle
    });

    // Extract text from the page
    const textContent = await page.evaluate(() => {
      let text = '';
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, article, section');
      elements.forEach(element => {
        text += element.innerText + '\n';
      });
      return text.replace(/\s+/g, ' ').trim();
    });

    await browser.close();
    return textContent;
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error(`Error scraping ${url}:`, error.message);
  }
};

const queryGemini = async (context, question) => {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: 'user',
        parts: [
          { text: context },
        ],
      },
      {
        role: 'model',
        parts: [
          { text: 'You have gathered the following information from the web. How can I help you with it?' },
        ],
      },
      {
        role: 'user',
        parts: [
          { text: question },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(question);
  return result.response.text();
};

// Main function to search, scrape, and query
const runQuery = async (queryQues) => {
  const searchQuery = queryQues;
  const question = queryQues + ' provide the source at end in this format: Website Name : *****link*****';

  try {
    const searchResults = await googleSearch(searchQuery);
    if (searchResults) {
      const urls = searchResults.slice(0, 2).map(item => item.link);
      let context = '';
      
      // Parallelize the scraping tasks
      const scrapePromises = urls.map(url => scrapeContent(url));
      const scrapedContents = await Promise.all(scrapePromises);
      context = scrapedContents.join('\n');

      const answer = await queryGemini(context, question);
      return answer;
    } else {
      return 'No results found.';
    }
  } catch (error) {
    console.error('Error during runQuery execution:', error);
    throw error;
  }
};

// Export the runQuery function
export { runQuery };
