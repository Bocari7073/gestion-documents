'use client';

import { useState } from 'react';

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  async function handleGenerate() {
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.text();
    setOutput(data);
  }

  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="font-bold mb-2">Générer le Contenu</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full border p-2 mb-2"
        rows={3}
        placeholder="Entrer votre instruction..."
      />
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Générer
      </button>
      {output && <p className="text-sm mt-2">{output}</p>}
    </div>
  );
}
