// // app/api/signup/route.ts
// import { NextResponse } from 'next/server'
// import { db } from '@/lib/db'
// import bcrypt from 'bcrypt'

// export async function POST(req: Request) {
//   const { email, name, password } = await req.json()

//   const existing = await db.selectFrom('user')
//     .select('id')
//     .where('email', '=', email)
//     .executeTakeFirst()

//   if (existing) {
//     return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 })
//   }

//   const hashed = await bcrypt.hash(password, 10)

//   await db.insertInto('user').values({
//     id: crypto.randomUUID(),
//     name,
//     email,
//     password: hashed,
//   }).execute()

//   return NextResponse.json({ success: true })
// }
