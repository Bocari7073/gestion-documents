import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file: File | null = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  // ✅ Enregistrement en base de données
 await db
  .insertInto('files')
  .values({
    name: file.name,
    path: `/uploads/${file.name}`,
    uploaded_at: new Date(),
  })
  .execute();

  return NextResponse.json({ message: 'Fichier téléversé et enregistré.' });
}
