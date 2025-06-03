'use client';

import { useState } from 'react';
import GeneratePdfButton from './GeneratePdfButton';

export default function InvoiceForm() {
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [savedInvoice, setSavedInvoice] = useState('');
  const factureText = `Client: ${client}\nMontant: ${amount} FCFA\nDescription: ${description}`;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client, amount, description }),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'enregistrement.');

      const data = await res.json();
      setMessage('✅ Facture enregistrée avec succès !');
       setTimeout(() => setMessage(''), 3000);
      setSavedInvoice(`Client: ${data.client}\nMontant: ${data.amount} FCFA\nDescription: ${data.description}`);
    } catch (err) {
      setMessage('❌ Échec de l\'enregistrement.');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white border rounded">
      <h2 className="font-bold text-lg">Nouvelle Facture</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Client"
          className="w-full p-2 border rounded"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Montant"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Enregistrer la facture
        </button>
      </form>

      {message && <p className="text-sm text-green-600">{message}</p>}

      {savedInvoice && (
        <div>
          <GeneratePdfButton content={factureText}  />
        </div>
      )}
    </div>
  );
}
