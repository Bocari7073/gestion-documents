import { io } from 'socket.io-client';

const socket = io({
  path: '/api/socket_io', // 🔧 match le serveur
});

export default socket;
