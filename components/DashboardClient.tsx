// 'use client';

// import FileUploader from '@/components/FileUploader';
// import FileList from '@/components/FileList';
// import PdfViewer from '@/components/PdfViewer';
// import AiSummary from '@/components/AiSummary';
// import ContentGenerator from '@/components/ContentGenerator';
// import { signOut } from 'next-auth/react';
// import PdfGenerator from '@/components/PDFGenerator';
// export default function DashboardClient() {
//   return (
//     <div className="min-h-screen p-6 space-y-6 bg-gray-100">
//       <h1 className="text-center text-xl font-bold">
//         Bienvenue sur la Page de Gestion de Document
//       </h1>

//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="md:col-span-1 space-y-4">
//           <FileUploader />
//           <FileList />
         
//         </div>

//         <div className="md:col-span-2 space-y-4">
//           <PdfViewer />
//           <div className="grid grid-cols-2 gap-4">
//              <PdfGenerator />
//             <AiSummary />
//             <ContentGenerator />
//           </div>
//         </div>
//       </div>

//       <div className="text-center">
//         <button
//           onClick={() => signOut({ callbackUrl: '/login' })}
//           className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//         >
//           Se déconnecter
//         </button>
//       </div>
//     </div>
//   );
// }
