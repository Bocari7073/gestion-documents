import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const content = body.content;

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Contenu invalide ou manquant' }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    const lines = content.split('\n');
    const lineHeight = fontSize + 4;
    let y = page.getHeight() - 40;

    for (const line of lines) {
      if (y < 40) {
        page.drawText('... (suite)', { x: 40, y, size: fontSize, font });
        break;
      }
      page.drawText(line, { x: 40, y, size: fontSize, font, color: rgb(0, 0, 0) });
      y -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération du PDF' }, { status: 500 });
  }
}
