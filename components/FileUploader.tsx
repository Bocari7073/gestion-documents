'use client';
import { useState } from 'react';

export default function FileUploader({ onUpload }: { onUpload: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/files', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setMessage('✅ Téléversé avec succès.');
      setFile(null);
      onUpload(); // 🔁 rafraîchir la liste
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('❌ Échec du téléversement.');
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        placeholder=' .'
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Téléverser
      </button>
      {message && <div className="text-sm text-green-700">{message}</div>}
    </div>
  );
}
