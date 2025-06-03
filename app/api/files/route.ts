import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  const files = await db.selectFrom('files').selectAll().execute();
  return NextResponse.json(files);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), 'public/uploads', file.name);
  await fs.writeFile(filePath, buffer);

 await db
  .insertInto('files')
  .values({
    name: file.name,
    path: `/uploads/${file.name}`,
    uploaded_at: new Date(), // 👈 Ajout de la date
  })
  .execute();
  return NextResponse.json({ message: '✅ Fichier téléversé avec succès' });
}
