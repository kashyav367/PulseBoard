import http from "http"

import dotenv from "dotenv"

import { Server } from "socket.io"

import app from "./app.js"

import connectDB from "./src/common/config/db.js"


dotenv.config()


connectDB()


const server = http.createServer(app)


const io = new Server(server, {

    cors: {

        origin: "*",

        methods: ["GET", "POST"]

    }

})


io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id)

    })

})


const PORT = process.env.PORT || 5000

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`)

})