import { Server as IOServer } from "socket.io"
import { NextApiResponse } from "next"
import { Socket as NetSocket } from "net"
import { Server as HTTPServer } from "http"

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: IOServer
    }
  }
}
