import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('❌ OPENAI_API_KEY est manquant dans .env.local');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("API Key utilisée:", process.env.OPENAI_API_KEY);

