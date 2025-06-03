import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "@/types/next";

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log("Initialisation de Socket.IO");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connecté");

      socket.on("message", (msg) => {
        console.log("Message reçu : ", msg);
        io.emit("message", msg); // diffusion
      });
    });
  }

  res.end();
}
