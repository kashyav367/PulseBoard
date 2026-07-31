import { useState, useEffect } from "react"
import { useParams } from "react"
import toast from "react-hot-toast"
import Navbar from "../components/Navbar"
import api from "../services/api"
import {
  Trophy,
  Globe,
  Copy,
  Share2,
  CheckCircle2,
  Loader2
} from "lucide-react"

function PublishedResults() {
  const { id } = useParams()
  const [poll, setPoll] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showQR, setShowQR] = useState(false)

  const resultLink = window.location.href

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/polls/results/${id}`)
        setPoll(res.data?.data)
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load published results"
        setError(msg)
        toast.error(msg)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchResults()
  }, [id])

  const copyLink = () => {
    navigator.clipboard.writeText(resultLink)
    toast.success("Result link copied to clipboard! 🚀")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20 text-orange-600">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="font-semibold text-lg">Fetching published results...</p>
        </div>
      </div>
    )
  }

  if (error || !poll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="bg-white border border-red-200 rounded-3xl p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-3">Results Unavailable</h2>
            <p className="text-stone-600">{error || "These poll results could not be found or are not published yet."}</p>
          </div>
        </div>
      </div>
    )
  }

  const overallTotalVotes = poll.questions?.reduce((acc, q) => {
    const qTotal = q.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0)
    return Math.max(acc, qTotal)
  }, 0) || 0

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
                {poll.description || "Final poll results are publicly visible for everyone."}
              </p>
            </div>

            {/* Votes */}
            <div className="bg-black/10 backdrop-blur border border-white/10 rounded-3xl px-8 py-6">
              <p className="text-white/80">Total Votes Submitted</p>
              <h2 className="text-5xl font-bold mt-3">{overallTotalVotes}</h2>
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
              <h2 className="text-2xl font-bold text-stone-800">Share Results 🌍</h2>
              <p className="text-stone-500 mt-2">
                Public users can view final poll outcomes using this link.
              </p>
              <div className="bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4 mt-5 text-stone-700 overflow-x-auto font-mono text-sm">
                {resultLink}
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={copyLink}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl font-semibold transition flex items-center gap-2 shadow-sm"
              >
                <Copy size={18} />
                Copy Link
              </button>

              <button
                onClick={() => setShowQR(!showQR)}
                className="border border-orange-200 text-orange-600 hover:bg-orange-50 px-6 py-4 rounded-2xl font-semibold transition flex items-center gap-2"
              >
                <Share2 size={18} />
                {showQR ? "Hide QR" : "Show QR"}
              </button>
            </div>
          </div>

          {/* QR */}
          {showQR && (
            <div className="mt-8 flex justify-center">
              <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-md text-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(resultLink)}`}
                  alt="Poll Results QR Code"
                  className="w-48 h-48 mx-auto rounded-2xl"
                />
                <p className="text-xs text-stone-500 font-medium mt-3">Scan to view results</p>
              </div>
            </div>
          )}
        </div>

        {/* RESULTS */}
        <div className="mt-14 space-y-8">
          <h2 className="text-4xl font-bold text-stone-800">Final Poll Results 📊</h2>

          {poll.questions?.map((q, index) => {
            const questionTotal = q.options?.reduce((sum, option) => sum + (option.votes || 0), 0) || 0
            const maxVotes = Math.max(...(q.options?.map((option) => option.votes || 0) || [0]))

            return (
              <div key={q._id || index} className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-stone-800">
                  Q{index + 1}. {q.question}
                </h3>

                <div className="mt-8 space-y-6">
                  {q.options?.map((option, optionIndex) => {
                    const votes = option.votes || 0
                    const percentage = questionTotal > 0 ? ((votes / questionTotal) * 100).toFixed(1) : "0.0"
                    const isWinner = votes > 0 && votes === maxVotes

                    return (
                      <div key={option._id || optionIndex}>
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-medium text-stone-700">
                              {option.text}
                            </span>

                            {isWinner && (
                              <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <Trophy size={14} />
                                Winner
                              </div>
                            )}
                          </div>

                          <span className="text-orange-600 font-bold">
                            {votes} {votes === 1 ? "vote" : "votes"} ({percentage}%)
                          </span>
                        </div>

                        <div className="w-full bg-orange-100 rounded-full h-5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isWinner ? "bg-orange-500" : "bg-amber-400"
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