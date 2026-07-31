import { io } from "socket.io-client"

const getSocketUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL
  }
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://pulseboard-o4dg.onrender.com"
}

const socket = io(getSocketUrl(), {
  autoConnect: true,
  transports: ["websocket", "polling"]
})

export default socket