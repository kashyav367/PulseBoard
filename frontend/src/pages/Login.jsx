function Login() {

  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:5000/api/auth/google"

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white border border-orange-100 rounded-3xl shadow-xl p-10">

        {/* Logo */}

        <div className="text-center">

          <h1 className="text-4xl font-bold">

            <span className="text-orange-500">
              Pulse
            </span>

            <span className="text-stone-800">
              Board
            </span>

            <span>
              ☕
            </span>

          </h1>

          <p className="text-stone-500 mt-4 leading-7">

            Welcome back 👋

            <br />

            Login securely using your
            Google account.

          </p>

        </div>

        {/* Google Button */}

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-10 flex items-center justify-center gap-3 border border-stone-200 hover:border-orange-300 hover:bg-orange-50 text-stone-700 py-4 rounded-2xl font-medium transition-all duration-300 shadow-sm"
        >

          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-6 h-6"
          />

          Login with Google

        </button>

        {/* Footer */}

        <p className="text-center text-sm text-stone-400 mt-8 leading-6">

          Secure authentication powered by Google OAuth 🔒

        </p>

      </div>

    </div>

  )

}

export default Login