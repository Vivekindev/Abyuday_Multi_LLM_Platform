import { google } from 'googleapis';
import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;
const googleCseId = process.env.GOOGLE_CSE_ID;
const geminiApiKey = process.env.GEMINI_API_KEY_1;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-latest',
  systemInstruction: 'you are an assistant',
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

// Scrape content from a URL
const scrapeContent = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let textContent = '';

    // Extract text from specific elements
    $('p, h1, h2, h3, h4, h5, h6, article, section').each((i, elem) => {
      textContent += $(elem).text() + '\n';
    });

    // Remove extra whitespace and return the cleaned content
    return textContent.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
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
          { text: 'I have gathered the following information from the web. How can I help you with it?' },
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
  const question = queryQues + ' provide the source at end in this format: [Website Name : *****link*****]';

  try {
    const searchResults = await googleSearch(searchQuery);
    if (searchResults) {
      const urls = searchResults.slice(0, 2).map(item => item.link);
      let context = '';
      for (const url of urls) {
        const content = await scrapeContent(url);
        context += content + '\n';
      }

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
