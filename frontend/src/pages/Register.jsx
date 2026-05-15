import { Link } from "react-router-dom"

function Register() {
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
          <form className="space-y-5">

            {/* Name */}
            <div>

              <label className="block mb-2 font-medium text-stone-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
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
                placeholder="Enter your email"
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
                placeholder="Create password"
                className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-lg transition"
            >
              Create Account 🚀
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-stone-500 mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-orange-600 font-semibold ml-2"
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