import { Server } from 'socket.io';

let io: Server;

export function getSocketServer(res: any) {
  if (!io) {
    io = new Server(res.socket.server); // on crée le serveur
    io.on('connection', (socket) => {
      console.log('✅ Client connecté');
    });
    res.socket.server.io = io; // on l’attache à l’objet serveur
  }
  return io;
}
