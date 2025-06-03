"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("✅ Compte créé avec succès !");
      setEmail("");
      setPassword("");

      // ✅ Redirection après 2 secondes
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      const error = await res.text();
      setMessage(`❌ Erreur: ${error}`);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">Créer un compte</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Adresse email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        className="w-full p-2 border rounded"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        S'inscrire
      </button>

      {message && <p className="text-center mt-4">{message}</p>}
    </form>
  );
}
