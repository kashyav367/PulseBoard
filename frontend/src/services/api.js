import axios from "axios"

const api = axios.create({
  baseURL: "https://pulseboard-o4dg.onrender.com/api"
})

export default api