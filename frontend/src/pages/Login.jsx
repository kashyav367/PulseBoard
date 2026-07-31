import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../services/api"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please enter email and password")
      return
    }

    setLoading(true)
    try {
      const response = await api.post("/auth/login", { email, password })
      const data = response.data?.data

      if (data?.token) {
        localStorage.setItem("token", data.token)
        toast.success("Welcome back! 👋")
        navigate("/dashboard")
      } else {
        toast.error("Login failed. No token received.")
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials"
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    const apiBase = import.meta.env.VITE_API_URL || (
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000/api"
        : "https://pulseboard-o4dg.onrender.com/api"
    )
    window.location.href = `${apiBase}/auth/google`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-orange-100 rounded-3xl shadow-xl p-8 md:p-10">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <span className="text-orange-500">Pulse</span>
            <span className="text-stone-800">Board</span>
            <span>☕</span>
          </h1>
          <p className="text-stone-500 mt-3 leading-7">
            Welcome back! Login to manage your polls and view live analytics.
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="mt-8 space-y-4">
          <div>
            <label className="block mb-2 font-medium text-stone-700 text-sm">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-lg transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-stone-400">or continue with</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-stone-200 hover:border-orange-300 hover:bg-orange-50 text-stone-700 py-3 rounded-2xl font-medium transition-all duration-300 shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Login with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-stone-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login