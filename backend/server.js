import dotenv from "dotenv"

dotenv.config()

import http from "http"

import { Server } from "socket.io"

import app from "./app.js"

import connectDB
from "./src/common/config/db.js"

import pollSocket
from "./src/sockets/poll.socket.js"

const PORT =
  process.env.PORT || 5000

connectDB()

const server =
  http.createServer(app)

// SOCKET.IO

const io =
  new Server(server, {

    cors: {

      origin: "*",

      methods: [
        "GET",
        "POST"
      ]

    }

  })

// USE SOCKETS

pollSocket(io)

// START SERVER

server.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    )

  }
)

// EXPORT IO

export { io }