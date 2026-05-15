import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">

      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6 font-medium">
              Real-time Polling Platform ☕
            </div>

            <h1 className="text-6xl font-bold leading-tight text-stone-800">
              Brew opinions
              <span className="text-orange-500"> in real-time.</span>
            </h1>

            <p className="text-stone-600 text-lg mt-6 leading-8">
              Create beautiful polls, collect responses instantly and
              analyze results with live analytics and real-time updates.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-8 flex-wrap">

              <Link
                to="/create-poll"
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl text-lg font-semibold transition shadow-md"
              >
                Create Poll 🚀
              </Link>

              <Link
                to="/dashboard"
                className="border border-orange-200 text-orange-600 hover:bg-orange-50 px-7 py-4 rounded-2xl text-lg font-semibold transition"
              >
                View Dashboard
              </Link>

            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 flex-wrap">

              <div>
                <h2 className="text-3xl font-bold text-stone-800">
                  10K+
                </h2>
                <p className="text-stone-500">
                  Poll Responses
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-stone-800">
                  500+
                </h2>
                <p className="text-stone-500">
                  Polls Created
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-stone-800">
                  Live
                </h2>
                <p className="text-stone-500">
                  Analytics
                </p>
              </div>

            </div>

          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            {/* Main Card */}
            <div className="bg-white rounded-3xl border border-orange-100 shadow-2xl p-8">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-2xl font-bold text-stone-800">
                    Favorite Frontend Framework?
                  </h2>

                  <p className="text-stone-500 mt-2">
                    Live Poll Results
                  </p>
                </div>

                <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                  Live
                </div>

              </div>

              {/* Poll Options */}
              <div className="space-y-5">

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-stone-700">
                      React
                    </span>

                    <span className="text-orange-600 font-semibold">
                      68%
                    </span>
                  </div>

                  <div className="w-full bg-orange-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-orange-500 h-full w-[68%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-stone-700">
                      Vue
                    </span>

                    <span className="text-orange-600 font-semibold">
                      18%
                    </span>
                  </div>

                  <div className="w-full bg-orange-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-orange-400 h-full w-[18%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-stone-700">
                      Angular
                    </span>

                    <span className="text-orange-600 font-semibold">
                      14%
                    </span>
                  </div>

                  <div className="w-full bg-orange-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-amber-400 h-full w-[14%] rounded-full"></div>
                  </div>
                </div>

              </div>

            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white border border-orange-100 rounded-2xl shadow-lg px-5 py-4">

              <h3 className="text-2xl font-bold text-orange-500">
                +1.2K
              </h3>

              <p className="text-stone-500 text-sm">
                Responses Today
              </p>

            </div>

            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white rounded-2xl shadow-lg px-5 py-4">

              <h3 className="text-2xl font-bold">
                Live
              </h3>

              <p className="text-orange-100 text-sm">
                Real-time Analytics
              </p>

            </div>

          </motion.div>

        </div>

      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-stone-800">
            Powerful Features 🚀
          </h2>

          <p className="text-stone-500 mt-4 text-lg">
            Everything you need to create modern live polls.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6">
              📊
            </div>

            <h3 className="text-2xl font-semibold text-stone-800">
              Live Analytics
            </h3>

            <p className="text-stone-500 mt-4 leading-7">
              Watch poll responses update instantly with real-time analytics.
            </p>

          </div>

          <div className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🔒
            </div>

            <h3 className="text-2xl font-semibold text-stone-800">
              Secure Responses
            </h3>

            <p className="text-stone-500 mt-4 leading-7">
              Support anonymous and authenticated response modes.
            </p>

          </div>

          <div className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6">
              ⏳
            </div>

            <h3 className="text-2xl font-semibold text-stone-800">
              Expiry Control
            </h3>

            <p className="text-stone-500 mt-4 leading-7">
              Polls automatically expire after the selected time.
            </p>

          </div>

        </div>

      </div>

      {/* How It Works */}
      <div className="bg-white border-y border-orange-100">

        <div className="max-w-7xl mx-auto px-4 py-20">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold text-stone-800">
              How PulseBoard Works ☕
            </h2>

            <p className="text-stone-500 mt-4 text-lg">
              Simple workflow for collecting opinions in real-time.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="text-center">

              <div className="bg-orange-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                1
              </div>

              <h3 className="text-2xl font-semibold mt-6 text-stone-800">
                Create Poll
              </h3>

              <p className="text-stone-500 mt-4 leading-7">
                Build dynamic polls with multiple questions and options.
              </p>

            </div>

            <div className="text-center">

              <div className="bg-orange-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                2
              </div>

              <h3 className="text-2xl font-semibold mt-6 text-stone-800">
                Share Link
              </h3>

              <p className="text-stone-500 mt-4 leading-7">
                Share the public poll link with your audience instantly.
              </p>

            </div>

            <div className="text-center">

              <div className="bg-orange-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                3
              </div>

              <h3 className="text-2xl font-semibold mt-6 text-stone-800">
                Analyze Results
              </h3>

              <p className="text-stone-500 mt-4 leading-7">
                Monitor live analytics and publish final results.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-orange-500 text-white">

        <div className="max-w-7xl mx-auto px-4 py-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>

              <h2 className="text-3xl font-bold">
                PulseBoard ☕
              </h2>

              <p className="text-orange-100 mt-2">
                Brew opinions in real-time.
              </p>

            </div>

            <div className="flex gap-6 text-orange-100">

              <a href="#">
                Home
              </a>

              <a href="#">
                Features
              </a>

              <a href="#">
                Dashboard
              </a>

            </div>

          </div>

        </div>

      </footer>

    </div>
  )
}

export default Home