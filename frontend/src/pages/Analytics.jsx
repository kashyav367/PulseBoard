import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import api from "../services/api"

import socket from "../services/socket"

import Navbar from "../components/Navbar"

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer

} from "recharts"

function Analytics() {

  const { id } = useParams()

  const [poll, setPoll] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const COLORS = [

    "#f97316",
    "#fb923c",
    "#fdba74",
    "#fed7aa",
    "#f59e0b"

  ]

  // FETCH

  const fetchAnalytics =
    async () => {

      try {

        const response =
          await api.get(
            `/polls/${id}`
          )

        setPoll(
          response.data.data
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

  // SOCKET

  useEffect(() => {

    fetchAnalytics()

    socket.emit(
      "join_poll",
      id
    )

    socket.on(
      "vote_updated",
      (updatedPoll) => {

        setPoll(
          updatedPoll
        )

      }
    )

    return () => {

      socket.off(
        "vote_updated"
      )

    }

  }, [id])

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen bg-[#fff8f1] flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <h1 className="text-3xl font-black text-orange-500">

            Loading Analytics...

          </h1>

        </div>

      </div>

    )

  }

  // NOT FOUND

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

              <div className="flex items-center gap-4 mb-4">

                <h1 className="text-5xl font-black">

                  Live Analytics 📊

                </h1>

                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">

                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>

                  <span className="font-semibold">

                    LIVE

                  </span>

                </div>

              </div>

              <p className="text-2xl opacity-90">

                {poll.title}

              </p>

            </div>

            <div className="bg-white/20 px-6 py-5 rounded-2xl backdrop-blur-md min-w-[180px]">

              <p className="text-sm opacity-80 mb-1">

                Total Questions

              </p>

              <h2 className="text-5xl font-black">

                {poll.questions?.length}

              </h2>

            </div>

          </div>

        </div>

        {/* QUESTIONS */}

        {

          poll.questions?.map(
            (question, index) => {

              const totalVotes =

                question.options?.reduce(

                  (acc, option) =>

                    acc +

                    Number(
                      option.votes || 0
                    ),

                  0

                )

              // WINNER

              const maxVotes =

                Math.max(

                  ...question.options.map(
                    (o) =>
                      Number(
                        o.votes || 0
                      )
                  )

                )

              return (

                <div
                  key={index}
                  className="bg-white border-2 border-stone-800 rounded-[32px] p-8 mb-10 shadow-[8px_8px_0px_#fdba74] hover:translate-y-[-5px] transition-all duration-300"
                >

                  {/* HEADER */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

                    <div>

                      <h2 className="text-4xl font-black text-stone-800 mb-3">

                        {question.question}

                      </h2>

                      {

                        totalVotes === 0 && (

                          <p className="text-orange-500 font-semibold">

                            No votes yet 🚀

                          </p>

                        )

                      }

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

                            {

                              question.options.map(
                                (_, i) => (

                                  <Cell
                                    key={i}
                                    fill={
                                      COLORS[
                                        i %
                                        COLORS.length
                                      ]
                                    }
                                  />

                                )
                              )

                            }

                          </Pie>

                          <Tooltip />

                        </PieChart>

                      </ResponsiveContainer>

                    </div>

                    {/* OPTIONS */}

                    <div className="space-y-6">

                      {

                        question.options?.map(
                          (
                            option,
                            i
                          ) => {

                            const votes =

                              Number(
                                option.votes || 0
                              )

                            const percentage =

                              totalVotes > 0

                                ? (
                                    votes /
                                    totalVotes
                                  ) * 100

                                : 0

                            const isWinner =

                              votes === maxVotes &&
                              votes > 0

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

                                    {

                                      isWinner && (

                                        <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">

                                          👑 Leading

                                        </span>

                                      )

                                    }

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

                                    {

                                      percentage > 10 && (

                                        <span className="text-white text-xs font-bold">

                                          {percentage.toFixed(
                                            0
                                          )}%

                                        </span>

                                      )

                                    }

                                  </div>

                                </div>

                                {/* PERCENT */}

                                <p className="text-right text-sm mt-2 text-stone-500 font-semibold">

                                  {percentage.toFixed(
                                    1
                                  )}%

                                </p>

                              </div>

                            )

                          }
                        )

                      }

                    </div>

                  </div>

                </div>

              )

            }
          )

        }

      </div>

    </div>

  )

}

export default Analytics