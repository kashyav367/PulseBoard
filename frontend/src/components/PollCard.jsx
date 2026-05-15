import { Link } from "react-router-dom"

import api from "../services/api"

import {
  BarChart3,
  Share2,
  Globe,
  Shield,
  CheckCircle2,
  Copy
} from "lucide-react"

function PollCard({ poll }) {

  const pollLink =
    `${window.location.origin}/poll/${poll._id}`

  // Copy Link
  const copyLink = () => {

    navigator.clipboard.writeText(
      pollLink
    )

    alert(
      "Poll link copied 🚀"
    )

  }

  // Publish Results
  const publishResults =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          )

        await api.patch(

          `/polls/publish/${poll._id}`,

          {},

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        )

        alert(
          "Results Published 🚀"
        )

        window.location.reload()

      } catch (error) {

        console.log(error)

        console.log(
          error.response?.data
        )

        alert(
          error.response?.data?.message ||
          "Publish failed"
        )

      }

    }

  // Share Poll
  const sharePoll =
    async () => {

      try {

        await navigator.share({

          title: poll.title,

          text: poll.description,

          url: pollLink,

        })

      } catch (error) {

        console.log(error)

      }

    }

  return (

    <div className="bg-white border-2 border-stone-800 rounded-[32px] p-7 shadow-[8px_8px_0px_#fdba74] hover:-translate-y-1 transition-all duration-300">

      {/* TOP */}

      <div className="flex items-start justify-between gap-5 flex-wrap">

        <div>

          <div className="flex items-center gap-3 flex-wrap">

            <h2 className="text-3xl font-black text-stone-800">

              {poll.title}

            </h2>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                poll.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >

              {poll.isPublished
                ? "Published"
                : "Draft"}

            </span>

          </div>

          <p className="text-stone-500 mt-4 leading-7 max-w-2xl">

            {poll.description ||
              "No description added"}

          </p>

        </div>

        {/* Expiry */}

        <div className="bg-orange-100 text-orange-700 px-5 py-3 rounded-2xl text-sm font-semibold">

          {

            poll.expiresAt

              ? new Date(
                  poll.expiresAt
                ).toLocaleString()

              : "No Expiry"

          }

        </div>

      </div>

      {/* META */}

      <div className="flex flex-wrap gap-3 mt-7">

        {/* Response Type */}

        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">

          <Shield size={16} />

          {

            poll.allowAnonymous &&
            poll.allowAuthenticated

              ? "Anonymous + Authenticated"

              : poll.allowAnonymous

              ? "Anonymous"

              : "Authenticated"

          }

        </div>

        {/* Questions */}

        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">

          <BarChart3 size={16} />

          {poll.questions?.length || 0}
          {" "}Questions

        </div>

        {/* Publish Status */}

        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">

          <Globe size={16} />

          {

            poll.isPublished

              ? "Results Published"

              : "Not Published"

          }

        </div>

      </div>

      {/* LINK BOX */}

      <div className="mt-7 bg-orange-50 border border-orange-100 rounded-3xl p-5">

        <p className="text-sm text-stone-500 mb-3 font-medium">

          Public Poll Link

        </p>

        <div className="flex items-center gap-4 flex-wrap">

          <div className="flex-1 bg-white border border-orange-100 rounded-2xl px-4 py-3 text-sm text-stone-700 overflow-x-auto">

            {pollLink}

          </div>

          <button

            onClick={copyLink}

            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl transition font-medium"

          >

            <Copy size={18} />

            Copy

          </button>

        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="mt-8 flex flex-wrap gap-4">

        {/* Participate */}

        <Link

          to={`/poll/${poll._id}`}

          className="bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-2xl transition font-medium"

        >

          Participate

        </Link>

        {/* Analytics */}
        <Link
            to={`/analytics/${poll._id}`}
        className="flex-1"
        >

         <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-medium transition">

         Analytics

        </button>

        </Link>

        {/* Publish */}

        <button

          onClick={publishResults}

          className="flex items-center gap-2 border border-orange-200 text-orange-600 hover:bg-orange-50 px-5 py-3 rounded-2xl transition font-medium"

        >

          <CheckCircle2 size={18} />

          Publish Results

        </button>

        {/* Share */}

        <button

          onClick={sharePoll}

          className="flex items-center gap-2 border border-orange-200 text-orange-600 hover:bg-orange-50 px-5 py-3 rounded-2xl transition font-medium"

        >

          <Share2 size={18} />

          Share Poll

        </button>

      </div>

    </div>

  )

}

export default PollCard