import { useEffect, useState } from "react"
import { useParams } from "react"
import toast from "react-hot-toast"
import api from "../services/api"
import socket from "../services/socket"
import Navbar from "../components/Navbar"
import { Download, Loader2 } from "lucide-react"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"

function Analytics() {
  const { id } = useParams()
  const [poll, setPoll] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  const COLORS = [
    "#f97316",
    "#fb923c",
    "#fdba74",
    "#fed7aa",
    "#f59e0b"
  ]

  const fetchAnalytics = async () => {
    try {
      // First get poll details
      const pollRes = await api.get(`/polls/${id}`)
      setPoll(pollRes.data.data)

      // Try dedicated analytics endpoint
      try {
        const analyticsRes = await api.get(`/analytics/${id}`)
        setAnalyticsData(analyticsRes.data.data)
      } catch (e) {
        // Fallback to poll object
      }
    } catch (error) {
      toast.error("Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()

    socket.emit("join_poll", id)

    socket.on("vote_updated", (updatedPoll) => {
      setPoll(updatedPoll)
      toast("Vote updated live! ⚡", { icon: "📊" })
    })

    return () => {
      socket.emit("leave_poll", id)
      socket.off("vote_updated")
    }
  }, [id])

  const exportToCSV = () => {
    if (!poll) return

    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += `Poll Title,${poll.title}\n`
    csvContent += `Created At,${poll.createdAt}\n\n`
    csvContent += "Question Number,Question Text,Option Text,Votes Count,Percentage\n"

    poll.questions?.forEach((q, qIndex) => {
      const qTotalVotes = q.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0) || 0

      q.options?.forEach((opt) => {
        const votes = opt.votes || 0
        const percentage = qTotalVotes > 0 ? ((votes / qTotalVotes) * 100).toFixed(1) : "0.0"
        csvContent += `"${qIndex + 1}","${q.question.replace(/"/g, '""')}","${opt.text.replace(/"/g, '""')}",${votes},${percentage}%\n`
      })
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `poll_analytics_${id}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("CSV export downloaded successfully! 📄")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f1] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-black text-orange-500">
            Loading Live Analytics...
          </h1>
        </div>
      </div>
    )
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-[#fff8f1] flex items-center justify-center">
        <h1 className="text-3xl font-black text-red-500">
          Poll not found 😢
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fff8f1]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* HERO */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-[32px] p-10 text-white shadow-[8px_8px_0px_#7c2d12] mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <h1 className="text-5xl font-black">
                  Live Analytics 📊
                </h1>

                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="font-semibold">LIVE</span>
                </div>
              </div>

              <p className="text-2xl opacity-90">
                {poll.title}
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold px-6 py-4 rounded-2xl shadow-md transition"
              >
                <Download size={20} />
                Export CSV
              </button>

              <div className="bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-md min-w-[160px]">
                <p className="text-sm opacity-80 mb-1">Total Questions</p>
                <h2 className="text-4xl font-black">{poll.questions?.length}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        {poll.questions?.map((question, index) => {
          const totalVotes = question.options?.reduce((acc, option) => acc + Number(option.votes || 0), 0)
          const maxVotes = Math.max(...(question.options?.map((o) => Number(o.votes || 0)) || [0]))

          return (
            <div
              key={index}
              className="bg-white border-2 border-stone-800 rounded-[32px] p-8 mb-10 shadow-[8px_8px_0px_#fdba74] hover:translate-y-[-5px] transition-all duration-300"
            >
              {/* HEADER */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
                <div>
                  <h2 className="text-3xl font-black text-stone-800 mb-3">
                    Q{index + 1}. {question.question}
                  </h2>

                  {totalVotes === 0 && (
                    <p className="text-orange-500 font-semibold">
                      No votes yet 🚀
                    </p>
                  )}
                </div>

                <div className="bg-orange-100 text-orange-600 px-5 py-3 rounded-full font-black text-lg">
                  {totalVotes} Total Votes
                </div>
              </div>

              {/* GRID */}
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* PIE CHART */}
                <div className="w-full h-[350px]">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={question.options}
                        dataKey="votes"
                        nameKey="text"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={70}
                        paddingAngle={5}
                        label
                      >
                        {question.options?.map((_, i) => (
                          <Cell
                            key={i}
                            fill={COLORS[i % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* OPTIONS */}
                <div className="space-y-6">
                  {question.options?.map((option, i) => {
                    const votes = Number(option.votes || 0)
                    const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0
                    const isWinner = votes === maxVotes && votes > 0

                    return (
                      <div
                        key={i}
                        className={`rounded-2xl p-5 border-2 transition-all duration-300 ${
                          isWinner
                            ? "border-orange-500 bg-orange-50"
                            : "border-orange-100"
                        }`}
                      >
                        {/* TOP */}
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-lg text-stone-800">
                              {option.text}
                            </span>

                            {isWinner && (
                              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                                👑 Leading
                              </span>
                            )}
                          </div>

                          <span className="font-black text-orange-500 text-lg">
                            {votes} votes
                          </span>
                        </div>

                        {/* BAR */}
                        <div className="relative w-full bg-orange-100 rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-500 h-6 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3"
                            style={{
                              width: `${percentage}%`
                            }}
                          >
                            {percentage > 10 && (
                              <span className="text-white text-xs font-bold">
                                {percentage.toFixed(0)}%
                              </span>
                            )}
                          </div>
                        </div>

                        {/* PERCENT */}
                        <p className="text-right text-sm mt-2 text-stone-500 font-semibold">
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Analytics