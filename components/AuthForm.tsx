// components/AuthForm.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const endpoint = isLogin ? '/api/login' : '/api/signup'
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      // Auto-login après signup ou login
      await signIn('credentials', {
        redirect: true,
        email,
        password,
        callbackUrl: '/',
      })
    } else {
      alert(data.error || 'Erreur')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? 'Connexion' : 'Inscription'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'Créer un compte'}
        </button>
      </form>

      <button
        className="mt-4 w-full bg-gray-200 py-2 rounded"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Créer un compte' : 'J’ai déjà un compte'}
      </button>

      <hr className="my-6" />

      <button
        className="w-full bg-red-500 text-white py-2 rounded"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        Se connecter avec Google
      </button>
    </div>
  )
}
