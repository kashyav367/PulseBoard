import { useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../services/api"
import {
  BarChart3,
  Share2,
  Globe,
  Shield,
  CheckCircle2,
  Copy,
  Trash2,
  ExternalLink
} from "lucide-react"

function PollCard({ poll, onDeleteSuccess }) {
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const pollLink = `${window.location.origin}/poll/${poll.slug || poll._id}`
  const resultsLink = `${window.location.origin}/results/${poll.slug || poll._id}`

  const copyLink = () => {
    navigator.clipboard.writeText(pollLink)
    toast.success("Poll link copied to clipboard! 🚀")
  }

  const publishResults = async () => {
    try {
      await api.patch(`/polls/publish/${poll._id}`)
      toast.success("Poll results published successfully! 🚀")
      window.location.reload()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to publish poll results")
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await api.delete(`/polls/${poll._id}`)
      toast.success("Poll deleted successfully 🗑️")
      setShowDeleteModal(false)
      if (onDeleteSuccess) onDeleteSuccess(poll._id)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete poll")
    } finally {
      setDeleting(false)
    }
  }

  const sharePoll = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poll.title,
          text: poll.description,
          url: pollLink,
        })
      } catch (error) {
        // User cancelled share
      }
    } else {
      copyLink()
    }
  }

  return (
    <div className="bg-white border-2 border-stone-800 rounded-[32px] p-7 shadow-[8px_8px_0px_#fdba74] hover:-translate-y-1 transition-all duration-300 relative">
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
              {poll.isPublished ? "Published" : "Draft"}
            </span>
          </div>

          <p className="text-stone-500 mt-3 leading-7 max-w-2xl">
            {poll.description || "No description added"}
          </p>
        </div>

        {/* Delete button & Expiry */}
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-2xl text-xs font-semibold">
            {poll.expiresAt ? new Date(poll.expiresAt).toLocaleDateString() : "No Expiry"}
          </div>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
            title="Delete Poll"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* META */}
      <div className="flex flex-wrap gap-3 mt-6">
        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
          <Shield size={16} />
          {poll.allowAnonymous && poll.allowAuthenticated
            ? "Anonymous + Auth"
            : poll.allowAnonymous
            ? "Anonymous Allowed"
            : "Authenticated Only"}
        </div>

        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
          <BarChart3 size={16} />
          {poll.questions?.length || 0} Questions
        </div>

        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <Globe size={16} />
          {poll.isPublished ? "Results Published" : "Not Published"}
        </div>
      </div>

      {/* LINK BOX */}
      <div className="mt-6 bg-orange-50 border border-orange-100 rounded-3xl p-5">
        <p className="text-xs text-stone-500 mb-2 font-medium">Public Poll Link</p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 bg-white border border-orange-100 rounded-2xl px-4 py-2.5 text-xs text-stone-700 overflow-x-auto font-mono">
            {pollLink}
          </div>

          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-2xl transition text-xs font-semibold shadow-sm"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          to={`/poll/${poll.slug || poll._id}`}
          className="bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-2xl transition font-semibold text-sm"
        >
          Vote Form
        </Link>

        <Link to={`/analytics/${poll._id}`} className="flex-1">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold text-sm transition shadow-sm">
            Analytics 📊
          </button>
        </Link>

        {poll.isPublished ? (
          <Link
            to={`/results/${poll.slug || poll._id}`}
            className="flex items-center gap-2 border border-green-300 text-green-700 hover:bg-green-50 px-4 py-3 rounded-2xl transition font-semibold text-sm"
          >
            <ExternalLink size={16} />
            View Results
          </Link>
        ) : (
          <button
            onClick={publishResults}
            className="flex items-center gap-2 border border-orange-200 text-orange-600 hover:bg-orange-50 px-4 py-3 rounded-2xl transition font-semibold text-sm"
          >
            <CheckCircle2 size={16} />
            Publish Results
          </button>
        )}

        <button
          onClick={sharePoll}
          className="flex items-center gap-2 border border-orange-200 text-orange-600 hover:bg-orange-50 px-4 py-3 rounded-2xl transition font-semibold text-sm"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-800 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-bold text-stone-800 mb-3">Delete Poll?</h3>
            <p className="text-stone-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-stone-800">"{poll.title}"</span>? This will permanently delete all associated votes and response data.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition shadow-md disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Poll"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PollCard