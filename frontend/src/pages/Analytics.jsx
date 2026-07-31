import { useEffect, useState } from "react"
import { useParams } from "react"
import toast from "react-hot-toast"
import api from "../services/api"
import socket from "../services/socket"
import Navbar from "../components/Navbar"
import { Download, Loader2, Users, Shield, ShieldCheck, BarChart3 } from "lucide-react"

// Pure SVG Bulletproof Donut Chart
function CustomDonutChart({ data, totalVotes, colors }) {
  if (!totalVotes || totalVotes <= 0 || !data || data.length === 0) return null

  let accumulatedPercent = 0
  const radius = 65
  const circumference = 2 * Math.PI * radius

  const slices = data.map((item, index) => {
    const votes = Number(item.votes) || 0
    const percent = votes / totalVotes
    const strokeDasharray = `${percent * circumference} ${circumference}`
    const strokeDashoffset = -accumulatedPercent * circumference
    accumulatedPercent += percent

    return {
      ...item,
      color: colors[index % colors.length],
      strokeDasharray,
      strokeDashoffset,
      percentStr: (percent * 100).toFixed(0)
    }
  })

  return (
    <div className="relative w-60 h-60 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#ffedd5"
          strokeWidth="28"
        />
        {slices.map((slice, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke={slice.color}
            strokeWidth="28"
            strokeDasharray={slice.strokeDasharray}
            strokeDashoffset={slice.strokeDashoffset}
            className="transition-all duration-500 hover:opacity-80"
          />
        ))}
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-black text-stone-800">{totalVotes}</span>
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Votes</span>
      </div>
    </div>
  )
}

function Analytics() {
  const { id } = useParams()
  const [poll, setPoll] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  const COLORS = [
    "#f97316",
    "#ea580c",
    "#fb923c",
    "#fdba74",
    "#f59e0b",
    "#d97706"
  ]

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const pollRes = await api.get(`/polls/${id}`)
      const fetchedPoll = pollRes.data?.data || pollRes.data
      setPoll(fetchedPoll)

      try {
        const analyticsRes = await api.get(`/analytics/${id}`)
        const data = analyticsRes.data?.data || analyticsRes.data
        if (data) {
          setAnalyticsData(data)
        }
      } catch (e) {
        console.log("Analytics endpoint fallback:", e)
      }
    } catch (error) {
      console.log("Error loading poll:", error)
      toast.error(error.response?.data?.message || "Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return
    fetchAnalytics()

    if (socket) {
      socket.emit("join_poll", id)

      socket.on("vote_updated", () => {
        fetchAnalytics()
        toast("Vote updated live! ⚡", { icon: "📊" })
      })
    }

    return () => {
      if (socket) {
        socket.emit("leave_poll", id)
        socket.off("vote_updated")
      }
    }
  }, [id])

  const exportToCSV = () => {
    if (!poll) return

    const questionsList = analyticsData?.analytics || poll.questions || []
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += `Poll Title,${poll.title || ""}\n`
    csvContent += `Created At,${poll.createdAt || ""}\n`
    csvContent += `Total Responses,${analyticsData?.totalResponses || 0}\n\n`
    csvContent += "Question Number,Question Text,Option Text,Votes Count,Percentage\n"

    questionsList.forEach((q, qIndex) => {
      const qText = q.questionText || q.question || `Question ${qIndex + 1}`
      const qTotalVotes = q.totalVotes || q.options?.reduce((sum, opt) => sum + (Number(opt.votes) || 0), 0) || 0

      q.options?.forEach((opt) => {
        const votes = Number(opt.votes) || 0
        const percentage = opt.percentage !== undefined
          ? opt.percentage
          : (qTotalVotes > 0 ? ((votes / qTotalVotes) * 100).toFixed(1) : "0.0")
        csvContent += `"${qIndex + 1}","${String(qText).replace(/"/g, '""')}","${String(opt.text || "").replace(/"/g, '""')}",${votes},${percentage}%\n`
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
        <div className="text-center p-8 bg-white border-2 border-stone-800 rounded-3xl shadow-lg max-w-md">
          <h1 className="text-3xl font-black text-red-500 mb-3">
            Poll not found 😢
          </h1>
          <p className="text-stone-600 mb-6 font-medium">The requested poll analytics could not be loaded or does not exist.</p>
          <a href="/dashboard" className="inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl hover:bg-orange-600 transition">
            Back to Dashboard
          </a>
        </div>
      </div>
    )
  }

  const displayQuestions = (analyticsData?.analytics && analyticsData.analytics.length > 0)
    ? analyticsData.analytics
    : (poll.questions?.map((q) => ({
        questionText: q.question,
        options: q.options?.map(opt => ({
          text: opt.text,
          votes: Number(opt.votes) || 0
        })),
        totalVotes: q.options?.reduce((acc, opt) => acc + (Number(opt.votes) || 0), 0) || 0
      })) || [])

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
                <h1 className="text-5xl font-black tracking-tight">
                  Live Analytics 📊
                </h1>

                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="font-semibold text-sm">LIVE</span>
                </div>
              </div>

              <p className="text-2xl opacity-90 font-medium">
                {poll.title || "Untitled Poll"}
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

              <div className="bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-md min-w-[140px]">
                <p className="text-xs opacity-80 mb-1 font-medium">Total Responses</p>
                <h2 className="text-4xl font-black">{analyticsData?.totalResponses ?? 0}</h2>
              </div>
            </div>
          </div>

          {/* RESPONSE BREAKDOWN BAR */}
          {analyticsData && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur">
                <Users className="w-6 h-6" />
                <div>
                  <p className="text-xs opacity-80 font-medium">Total Participants</p>
                  <p className="text-lg font-bold">{analyticsData.totalResponses || 0}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur">
                <ShieldCheck className="w-6 h-6" />
                <div>
                  <p className="text-xs opacity-80 font-medium">Authenticated Votes</p>
                  <p className="text-lg font-bold">{analyticsData.authenticatedResponses || 0}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur">
                <Shield className="w-6 h-6" />
                <div>
                  <p className="text-xs opacity-80 font-medium">Anonymous Votes</p>
                  <p className="text-lg font-bold">{analyticsData.anonymousResponses || 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QUESTIONS */}
        {displayQuestions.length === 0 ? (
          <div className="bg-white border-2 border-stone-800 rounded-[32px] p-10 text-center shadow-[8px_8px_0px_#fdba74]">
            <BarChart3 className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-stone-800 mb-2">No Questions Found</h2>
            <p className="text-stone-500 font-medium">This poll does not contain any questions to display analytics for.</p>
          </div>
        ) : (
          displayQuestions.map((question, index) => {
            const options = question.options || []
            const qTotalVotes = question.totalVotes || options.reduce((acc, option) => acc + Number(option.votes || 0), 0)
            const maxVotes = Math.max(...(options.map((o) => Number(o.votes || 0)) || [0]))
            const questionText = question.questionText || question.question || `Question ${index + 1}`

            const chartData = options.map((opt) => ({
              text: String(opt.text || "Option"),
              votes: Number(opt.votes) || 0
            }))

            return (
              <div
                key={index}
                className="bg-white border-2 border-stone-800 rounded-[32px] p-8 mb-10 shadow-[8px_8px_0px_#fdba74] hover:translate-y-[-3px] transition-all duration-300"
              >
                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-stone-800 mb-2">
                      Q{index + 1}. {questionText}
                    </h2>

                    {qTotalVotes === 0 && (
                      <p className="text-orange-500 font-semibold">
                        No responses recorded yet 🚀
                      </p>
                    )}
                  </div>

                  <div className="bg-orange-100 text-orange-700 px-5 py-3 rounded-full font-black text-lg">
                    {qTotalVotes} {qTotalVotes === 1 ? "Vote" : "Votes"}
                  </div>
                </div>

                {/* GRID */}
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* CHART CONTAINER */}
                  <div className="w-full h-[320px] bg-orange-50/50 rounded-3xl p-4 border border-orange-100 flex items-center justify-center min-h-[300px]">
                    {qTotalVotes > 0 ? (
                      <CustomDonutChart data={chartData} totalVotes={qTotalVotes} colors={COLORS} />
                    ) : (
                      <div className="text-center p-6">
                        <BarChart3 className="w-12 h-12 text-orange-300 mx-auto mb-2 opacity-60" />
                        <p className="text-stone-500 font-semibold text-sm">
                          Chart will appear once votes are cast 📈
                        </p>
                      </div>
                    )}
                  </div>

                  {/* OPTIONS */}
                  <div className="space-y-5">
                    {options.map((option, i) => {
                      const votes = Number(option.votes || 0)
                      const percentage = option.percentage !== undefined
                        ? Number(option.percentage)
                        : (qTotalVotes > 0 ? (votes / qTotalVotes) * 100 : 0)
                      const isWinner = votes === maxVotes && votes > 0
                      const optColor = COLORS[i % COLORS.length]

                      return (
                        <div
                          key={i}
                          className={`rounded-2xl p-5 border-2 transition-all duration-300 ${
                            isWinner
                              ? "border-orange-500 bg-orange-50/80 shadow-sm"
                              : "border-orange-100 hover:border-orange-200"
                          }`}
                        >
                          {/* TOP */}
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-3">
                              <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: optColor }}></span>
                              <span className="font-bold text-lg text-stone-800">
                                {option.text}
                              </span>

                              {isWinner && (
                                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                                  👑 Leading
                                </span>
                              )}
                            </div>

                            <span className="font-black text-orange-600 text-lg">
                              {votes} {votes === 1 ? "vote" : "votes"}
                            </span>
                          </div>

                          {/* BAR */}
                          <div className="relative w-full bg-orange-100/80 rounded-full h-5 overflow-hidden">
                            <div
                              className="h-5 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3"
                              style={{
                                width: `${Math.max(percentage, votes > 0 ? 5 : 0)}%`,
                                backgroundColor: optColor
                              }}
                            >
                              {percentage > 12 && (
                                <span className="text-white text-xs font-bold">
                                  {percentage.toFixed(0)}%
                                </span>
                              )}
                            </div>
                          </div>

                          {/* PERCENT */}
                          <p className="text-right text-xs mt-2 text-stone-500 font-bold">
                            {percentage.toFixed(1)}%
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Analytics

