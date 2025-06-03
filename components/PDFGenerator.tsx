"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";

export default function PdfGenerator() {
  const [content, setContent] = useState("");

  const generatePdf = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(content, 180); // 180mm width
    doc.text(lines, 10, 10);
    doc.save("document.pdf");
  };

  return (
    <div className="p-4 border rounded bg-white space-y-4">
      <h2 className="font-bold text-lg">Générateur de PDF</h2>
      <textarea
        className="w-full h-48 p-2 border rounded"
        placeholder="Écris ton contenu ici..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={generatePdf}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Générer PDF
      </button>
    </div>
  );
}
