import { db } from '@/lib/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existing = await db
    .selectFrom('users')
    .select('email')
    .where('email', '=', email)
    .executeTakeFirst();

  if (existing) {
    return new NextResponse("Cet utilisateur existe déjà", { status: 400 });
  }

  const hashed = await hash(password, 10);

  await db.insertInto('users').values({
    email,
    password: hashed,
    created_at: new Date(),
  }).execute();

  return NextResponse.json({ success: true });
}
