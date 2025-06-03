'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/FileUploader';
import FileList from '@/components/FileList';
import PdfViewer from '@/components/PdfViewer';
import AiSummary from '@/components/AiSummary';
import ContentGenerator from '@/components/ContentGenerator';
import { signOut } from 'next-auth/react';
import DownloadPDFButton from '@/components/GeneratePdfButton';
import FactureForm from "@/components/FactureForm";
import GeneratePdfButton from '@/components/GeneratePdfButton';
import { getServerSession } from "next-auth"

export default function DashboardPage() {
  const [files, setFiles] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const fetchFiles = async () => {
    const res = await fetch('/api/files');
    const data = await res.json();
    
    setFiles(data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-100">
      <div className="text-center text-xl font-bold">
        Bienvenue sur la Page de Gestion de Document
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <h1 className="text-xl font-bold">Gestion des fichiers PDF</h1>
          <FileUploader onUpload={() => setRefreshKey(prev => prev + 1)} />
           {/* <PdfViewer /> */}
          <FactureForm/>
          {/* <GeneratePdfButton content="Résumé ou contenu HTML sous forme de texte à insérer dans le PDF." /> */}
        </div>

        <div className="md:col-span-2 space-y-4">
         <FileList key={refreshKey} />
          
          <div className="grid grid-cols-2 gap-4">
            <AiSummary />
            <ContentGenerator />
          </div>
        </div>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Se déconnecter
      </button>
    </div>
  );
}
