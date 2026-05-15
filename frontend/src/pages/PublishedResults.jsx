import { useState } from "react"

import Navbar from "../components/Navbar"

import {
  Trophy,
  Globe,
  Copy,
  Share2,
  QrCode,
  CheckCircle2
} from "lucide-react"

import QRCode from "react-qr-code"

function PublishedResults() {

  const [showQR, setShowQR] = useState(false)

  const resultLink = "https://pulseboard.vercel.app/results/1"

  // Copy Link
  const copyLink = () => {
    navigator.clipboard.writeText(resultLink)
    alert("Result link copied 🚀")
  }

  // Dummy Results Data
  const poll = {
    title: "Favorite Frontend Framework ☕",
    totalVotes: 124,
    published: true,
    questions: [
      {
        id: 1,
        question: "Which frontend framework do you use the most?",
        options: [
          { name: "React", votes: 68 },
          { name: "Vue", votes: 20 },
          { name: "Angular", votes: 12 },
          { name: "Svelte", votes: 8 },
        ]
      },
      {
        id: 2,
        question: "Which framework has the best developer experience?",
        options: [
          { name: "React", votes: 55 },
          { name: "Vue", votes: 30 },
          { name: "Angular", votes: 10 },
          { name: "Next.js", votes: 15 },
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-[2rem] p-10 text-white shadow-xl relative overflow-hidden">

          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium border border-white/20">

                <Globe size={16} />

                Public Results Published

              </div>

              <h1 className="text-5xl font-bold mt-6 leading-tight">
                {poll.title}
              </h1>

              <p className="mt-5 text-white/90 text-lg leading-8 max-w-2xl">
                Final poll results are now publicly visible for everyone.
              </p>

            </div>

            {/* Votes */}
            <div className="bg-black/10 backdrop-blur border border-white/10 rounded-3xl px-8 py-6">

              <p className="text-white/80">
                Total Votes
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {poll.totalVotes}
              </h2>

              <div className="flex items-center gap-2 mt-4 text-white/90">

                <CheckCircle2 size={18} />

                Poll Completed

              </div>

            </div>

          </div>

        </div>

        {/* SHARE SECTION */}
        <div className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm mt-10">

          <div className="flex items-center justify-between gap-6 flex-wrap">

            <div className="flex-1">

              <h2 className="text-2xl font-bold text-stone-800">
                Share Results 🌍
              </h2>

              <p className="text-stone-500 mt-2">
                Public users can view final poll outcomes using this link.
              </p>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4 mt-5 text-stone-700 overflow-x-auto">
                {resultLink}
              </div>

            </div>

            <div className="flex gap-4 flex-wrap">

              {/* Copy */}
              <button
                onClick={copyLink}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl font-semibold transition flex items-center gap-2"
              >

                <Copy size={18} />

                Copy Link

              </button>

              {/* QR */}
              <button
                onClick={() => setShowQR(!showQR)}
                className="border border-orange-200 text-orange-600 hover:bg-orange-50 px-6 py-4 rounded-2xl font-semibold transition flex items-center gap-2"
              >

                <QrCode size={18} />

                {showQR ? "Hide QR" : "Show QR"}

              </button>

            </div>

          </div>

          {/* QR */}
          {showQR && (

            <div className="mt-8 flex justify-center">

              <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8">

                <QRCode
                  value={resultLink}
                  size={200}
                />

              </div>

            </div>

          )}

        </div>

        {/* RESULTS */}
        <div className="mt-14 space-y-8">

          <h2 className="text-4xl font-bold text-stone-800">
            Final Poll Results 📊
          </h2>

          {poll.questions.map((q, index) => {

            const totalVotes = q.options.reduce(
              (sum, option) => sum + option.votes,
              0
            )

            const maxVotes = Math.max(
              ...q.options.map(option => option.votes)
            )

            return (

              <div
                key={q.id}
                className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm"
              >

                <h3 className="text-2xl font-semibold text-stone-800">
                  Q{index + 1}. {q.question}
                </h3>

                <div className="mt-8 space-y-6">

                  {q.options.map((option, optionIndex) => {

                    const percentage = (
                      (option.votes / totalVotes) * 100
                    ).toFixed(0)

                    const isWinner = option.votes === maxVotes

                    return (

                      <div key={optionIndex}>

                        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">

                          <div className="flex items-center gap-3">

                            <span className="text-lg font-medium text-stone-700">
                              {option.name}
                            </span>

                            {isWinner && (

                              <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">

                                <Trophy size={14} />

                                Winner

                              </div>

                            )}

                          </div>

                          <span className="text-orange-600 font-bold">
                            {option.votes} votes ({percentage}%)
                          </span>

                        </div>

                        <div className="w-full bg-orange-100 rounded-full h-5 overflow-hidden">

                          <div
                            className={`h-full rounded-full ${
                              isWinner
                                ? "bg-orange-500"
                                : "bg-amber-400"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>

                        </div>

                      </div>

                    )

                  })}

                </div>

              </div>

            )

          })}

        </div>

        {/* Footer */}
        <div className="mt-14 text-center">

          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-full font-medium">

            <Share2 size={18} />

            Thanks for participating in this poll ☕

          </div>

        </div>

      </div>

    </div>
  )
}

export default PublishedResults