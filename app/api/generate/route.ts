import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // ✅ accessible à tous
    messages: [
      { role: 'user', content: prompt }
    ]
  });

  return NextResponse.json(completion.choices[0].message.content);
}
