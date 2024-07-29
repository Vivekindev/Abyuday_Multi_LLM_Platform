import OpenAI from 'openai';

const llmModels = {
    "Mixtral8x22BInstruct" : "mistralai/mixtral-8x22b-instruct-v0.1",
    "Mixtral8x7BInstruct" : "mistralai/mixtral-8x7b-instruct-v0.1",
    "Mistral7BInstruct" : "mistralai/mistral-7b-instruct-v0.2",
    "Llama270B"  : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/0e349b44-440a-44e1-93e9-abe8dcb27158",
    "CodeLlama70B" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/2ae529dc-f728-4a46-9b8d-2697213666d8",
    "CodeLlama34B" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/df2bee43-fb69-42b9-9ee5-f4eabbeaf3a8",
    "CodeLlama13B" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/f6a96af4-8bf9-4294-96d6-d71aa787612e",
    "NVLlama270BRLHF" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/7b3e3361-4266-41c8-b312-f5e33c81fc92",
    "NVLlama270BSteerLMChat" : "https://api.nvcf.nvidia.com/v2/nvcf/pexec/functions/d6fe6881-973a-4279-a0f8-e1d486c9618d"
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



