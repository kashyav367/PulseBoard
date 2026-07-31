import { Server } from "socket.io"
import pollSocket from "../../sockets/poll.socket.js"

let io = null

export const initSocket = (server) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "https://pulseboard.vercel.app",
    "http://localhost:3000"
  ]

  io = new Server(server, {
    cors: {
      origin: (origin, callback) => callback(null, true),
      methods: ["GET", "POST"]
    }
  })

  pollSocket(io)
  return io
}

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!")
  }
  return io
}
