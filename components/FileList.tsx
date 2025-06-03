'use client';
import { useEffect, useState } from 'react';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchFiles() {
    const res = await fetch('/api/files');
    const data = await res.json();
    setFiles(data);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  async function handleDelete(name: string) {
    const confirmed = confirm(`Supprimer le fichier ${name} ?`);
    if (!confirmed) return;

    const res = await fetch(`/api/files/${name}`, { method: 'DELETE' });

    if (res.ok) {
      setMessage('✅ Fichier supprimé avec succès.');
      fetchFiles();
    } else {
      setMessage('❌ Erreur lors de la suppression.');
    }

    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div className="p-4 bg-white border rounded">
      <h2 className="font-bold mb-2">Fichiers PDF Téléversés</h2>
      {message && <div className="text-sm text-green-600 mb-2">{message}</div>}
      <ul className="space-y-2">
        {files.map((file: any) => (
          <li key={file.name} className="flex justify-between items-center">
            <a
              href={file.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {file.name}
            </a>
            <button
              onClick={() => handleDelete(file.name)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
