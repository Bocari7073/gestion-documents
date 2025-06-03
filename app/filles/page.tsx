'use client';
import { useState } from "react";

export default function FileList({ initialFiles }: { initialFiles: { id: number; name: string }[] }) {
  const [files, setFiles] = useState(initialFiles);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce fichier ?");
    if (!confirm) return;

    const res = await fetch(`/api/files/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      setFiles(files.filter(file => file.id !== id));
    } else {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Mes fichiers</h1>
      <ul className="space-y-2">
        {files.map(file => (
          <li key={file.id} className="flex justify-between items-center border p-2 rounded">
            <span>{file.name}</span>
            <button
              onClick={() => handleDelete(file.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
