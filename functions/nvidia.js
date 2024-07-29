import OpenAI from 'openai';

const llmModels = {
    "Mixtral8x22BInstruct" : "mistralai/mixtral-8x22b-instruct-v0.1",
    "Mixtral8x7BInstruct" : "mistralai/mixtral-8x7b-instruct-v0.1",
    "Mistral7BInstruct" : "mistralai/mistral-7b-instruct-v0.2",
    "llama-3.1-405b-instruct"  : "meta/llama-3.1-405b-instruct",
    "llama-3.1-8b-instruct" : "meta/llama-3.1-8b-instruct",
    "Google-gemma-2-9b" : "google/gemma-2-9b-it",

   }

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

export async function sendRequest(userMessage,model) {
  const completion = await openai.chat.completions.create({
    model: llmModels[`${model}`],
    messages: [{"role":"user","content":`${userMessage}`}],
    temperature: 0.5,
    top_p: 1,
    max_tokens: 1024,
    stream: true,
  })
  
  const chunks = [];
  
  for await (const chunk of completion) {
    chunks.push(chunk.choices[0]?.delta?.content || '');
  }
  
  const fullOutput = chunks.join('');
  return fullOutput;
}



