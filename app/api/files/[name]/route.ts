import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function DELETE(req: NextRequest, context: { params: { name: string } }) {
  const { name } = context.params;
  const filePath = path.join(process.cwd(), 'public/uploads', name);

  try {
    // Supprimer du disque
    await fs.unlink(filePath);
  } catch {
    // ignore
  }

  // Supprimer de la base
  await db.deleteFrom('files').where('name', '=', name).execute();

  return NextResponse.json({ message: '✅ Fichier supprimé' });
}
