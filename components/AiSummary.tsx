'use client';

import { useState } from 'react';

export default function AiSummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [textToSummarize, setTextToSummarize] = useState('');

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToSummarize }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors du résumé');
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
      setSummary("Erreur lors du résumé.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="font-bold mb-2">Résumé IA</h3>

      <textarea
        className="w-full p-2 border mb-2 rounded"
        rows={4}
        placeholder="Texte à résumer"
        value={textToSummarize}
        onChange={(e) => setTextToSummarize(e.target.value)}
      />

      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Générer'}
      </button>

      <p className="text-sm text-gray-700 mt-4 whitespace-pre-line">
        {summary || 'Aucun résumé pour le moment.'}
      </p>

      <button
    className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
    onClick={async () => {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: summary }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.click();
    }}
  >
    Télécharger en PDF
  </button>
    </div>
  );
}
