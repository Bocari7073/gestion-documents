'use client';

import { useState } from 'react';

export default function GeneratePdfButton({ content }: { content: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePdf = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la génération du PDF');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'facture.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGeneratePdf}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Génération...' : 'Télécharger en PDF'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
