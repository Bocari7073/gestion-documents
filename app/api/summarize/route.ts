import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Texte manquant' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Résume le texte ci-dessous de manière concise et claire en français.' },
        { role: 'user', content: text },
      ],
    });

    const summary = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Erreur OpenAI:', error);
    return NextResponse.json({ error: 'Erreur lors du résumé' }, { status: 500 });
  }
}
