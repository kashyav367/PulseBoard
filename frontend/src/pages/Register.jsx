import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../services/api"

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const response = await api.post("/auth/register", formData)
      const data = response.data?.data

      if (data?.token) {
        localStorage.setItem("token", data.token)
        toast.success("Account created successfully! 🚀")
        navigate("/dashboard")
      } else {
        toast.success("Registration successful! Please login.")
        navigate("/login")
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again."
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 grid md:grid-cols-2">
      {/* Left */}
      <div className="hidden md:flex flex-col justify-center px-20 bg-orange-500 text-white">
        <div>
          <h1 className="text-6xl font-bold leading-tight">
            Join PulseBoard ☕
          </h1>
          <p className="mt-6 text-orange-100 text-lg leading-8">
            Create engaging polls, gather opinions and monitor live
            analytics in one beautiful platform.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
              ⚡ Real-time updates
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
              📈 Poll analytics dashboard
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
              ☕ Modern user experience
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white border border-orange-100 rounded-3xl p-8 shadow-xl">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-stone-800">
              Register
            </h2>
            <p className="text-stone-500 mt-3">
              Create your PulseBoard account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium text-stone-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-stone-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-stone-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-lg transition shadow-md"
            >
              {loading ? "Creating Account..." : "Create Account 🚀"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-stone-500 mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-orange-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register