'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function SocketInit() {
  useEffect(() => {
    const socket = io({
      path: '/api/socket',
    })

    socket.on('connect', () => {
      console.log('🟢 Connecté à Socket.io')
    })

    socket.on('newFile', (fileName: string) => {
      alert(`📂 Nouveau fichier uploadé : ${fileName}`)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return null
}
