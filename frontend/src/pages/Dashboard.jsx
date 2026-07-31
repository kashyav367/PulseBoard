import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../services/api"
import Navbar from "../components/Navbar"
import StatsCard from "../components/StatsCard"
import PollCard from "../components/PollCard"
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  Vote,
  PlusCircle,
  Sparkles,
  Loader2
} from "lucide-react"

function Dashboard() {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPolls = async () => {
    try {
      setLoading(true)
      const response = await api.get("/polls/my-polls")
      setPolls(response.data.data || [])
    } catch (error) {
      toast.error("Failed to load polls")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPolls()
  }, [])

  const handlePollDeleted = (pollId) => {
    setPolls((prev) => prev.filter((p) => p._id !== pollId))
  }

  const activePolls = polls.filter(
    (poll) =>
      !poll.expiresAt || new Date(poll.expiresAt) > new Date()
  )

  const expiredPolls = polls.filter(
    (poll) =>
      poll.expiresAt && new Date(poll.expiresAt) <= new Date()
  )

  const totalResponsesCount = polls.reduce((sum, poll) => {
    const pollVotes = poll.questions?.reduce((qSum, q) => {
      return qSum + (q.options?.reduce((optSum, o) => optSum + (o.votes || 0), 0) || 0)
    }, 0) || 0
    return sum + pollVotes
  }, 0)

  return (
    <div className="min-h-screen bg-[#fff8f1] overflow-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HERO */}
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-500 rounded-[2.8rem] px-6 md:px-10 py-10 md:py-12 text-white shadow-[10px_10px_0px_#7c2d12]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white text-orange-600 px-5 py-2 rounded-full font-medium shadow-sm mb-6">
              <Sparkles size={16} />
              PulseBoard Dashboard
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Create & Manage
              <br />
              Live Polls 🚀
            </h1>

            <p className="mt-6 text-base md:text-lg text-orange-50 leading-7 max-w-2xl">
              Create beautiful live polls, collect responses in real-time and manage audience engagement with PulseBoard.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/create-poll"
                className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 px-7 py-4 rounded-2xl font-semibold transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <PlusCircle size={22} />
                Create Poll
              </Link>

              <a
                href="#your-polls"
                className="w-full sm:w-auto border border-white/30 bg-white/10 hover:bg-white/20 px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all"
              >
                <BarChart3 size={22} />
                View Polls
              </a>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <StatsCard
            title="Total Polls"
            value={polls.length}
            icon={<Vote />}
            color="bg-orange-500"
          />

          <StatsCard
            title="Active Polls"
            value={activePolls.length}
            icon={<CheckCircle2 />}
            color="bg-green-500"
          />

          <StatsCard
            title="Expired"
            value={expiredPolls.length}
            icon={<Clock3 />}
            color="bg-red-500"
          />

          <StatsCard
            title="Total Responses"
            value={totalResponsesCount}
            icon={<BarChart3 />}
            color="bg-amber-500"
          />
        </div>

        {/* YOUR POLLS */}
        <div id="your-polls" className="mt-16">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-stone-800">
                Your Polls ☕
              </h2>
              <p className="text-stone-500 mt-2">
                Manage and monitor all your created polls.
              </p>
            </div>

            <Link
              to="/create-poll"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl transition font-semibold shadow-lg text-center"
            >
              + Create Poll
            </Link>
          </div>

          {/* POLLS */}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-orange-600">
              <Loader2 className="animate-spin mb-2" size={36} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {polls.length > 0 ? (
                polls.map((poll) => (
                  <PollCard
                    key={poll._id}
                    poll={poll}
                    onDeleteSuccess={handlePollDeleted}
                  />
                ))
              ) : (
                <div className="bg-white border-2 border-stone-800 rounded-[32px] p-12 text-center col-span-1 lg:col-span-2 shadow-[8px_8px_0px_#fdba74]">
                  <h2 className="text-3xl font-bold text-stone-800">
                    No Polls Yet 🚀
                  </h2>
                  <p className="text-stone-500 mt-4 text-lg">
                    Create your first poll and start collecting live responses instantly.
                  </p>
                  <Link
                    to="/create-poll"
                    className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-semibold transition shadow-md"
                  >
                    Create First Poll
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard