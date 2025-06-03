// "use client";
// import { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/webpack";

// export default function PdfTextExtractor({ onExtract }: { onExtract: (text: string) => void }) {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = async () => {
//       setLoading(true);
//       const typedarray = new Uint8Array(reader.result as ArrayBuffer);
//       const pdf = await pdfjsLib.getDocument(typedarray).promise;

//       let fullText = "";
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
//       }

//       setText(fullText);
//       onExtract(fullText);
//       setLoading(false);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className="space-y-4">
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       {loading ? <p>Chargement...</p> : null}
//       <textarea className="w-full h-64 p-2 border rounded" value={text} readOnly />
//     </div>
//   );
// }
