import { io } from "socket.io-client"

let socketInstance = null

export const getSocket = () => {
  if (!socketInstance && typeof window !== "undefined") {
    try {
      const socketUrl = import.meta.env.VITE_SOCKET_URL || (
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
          ? "http://localhost:5000"
          : "https://pulseboard-o4dg.onrender.com"
      )

      socketInstance = io(socketUrl, {
        autoConnect: true,
        transports: ["websocket", "polling"]
      })
    } catch (err) {
      console.log("Socket connection error:", err)
    }
  }
  return socketInstance
}

const socket = getSocket()
export default socket