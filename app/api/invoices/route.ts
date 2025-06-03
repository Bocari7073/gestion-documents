import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { client, amount, description } = body;

  const facture = await db
    .insertInto('factures')
    .values({
      client,
      amount: parseFloat(amount),
      description,
      created_at: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  return NextResponse.json(facture);
}
