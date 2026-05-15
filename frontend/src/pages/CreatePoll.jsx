import api from "../services/api"

import { useState } from "react"

import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import {
  Trash2,
  Plus,
  Loader2
} from "lucide-react"

function CreatePoll() {

  const navigate = useNavigate()

  const [loading, setLoading] =
    useState(false)

  const [pollData, setPollData] =
    useState({
      title: "",
      description: "",
      expiresAt: null,
      responseMode: "both",
      publishResults: true,
    })

  const [questions, setQuestions] =
    useState([
      {
        question: "",
        required: true,
        options: ["", ""]
      }
    ])

  // Poll Inputs

  const handlePollChange = (e) => {

    setPollData({
      ...pollData,
      [e.target.name]:
        e.target.value
    })

  }

  // Question Change

  const handleQuestionChange = (
    index,
    value
  ) => {

    const updated = [...questions]

    updated[index].question =
      value

    setQuestions(updated)

  }

  // Option Change

  const handleOptionChange = (
    qIndex,
    oIndex,
    value
  ) => {

    const updated = [...questions]

    updated[qIndex].options[oIndex] =
      value

    setQuestions(updated)

  }

  // Add Option

  const addOption = (index) => {

    const updated = [...questions]

    updated[index].options.push("")

    setQuestions(updated)

  }

  // Remove Option

  const removeOption = (
    qIndex,
    oIndex
  ) => {

    if (
      questions[qIndex].options.length <= 2
    ) {
      return
    }

    const updated = [...questions]

    updated[qIndex].options =
      updated[qIndex].options.filter(
        (_, i) => i !== oIndex
      )

    setQuestions(updated)

  }

  // Add Question

  const addQuestion = () => {

    setQuestions([
      ...questions,
      {
        question: "",
        required: true,
        options: ["", ""]
      }
    ])

  }

  // Delete Question

  const deleteQuestion = (
    index
  ) => {

    if (questions.length === 1) {

      alert(
        "At least one question required"
      )

      return

    }

    const updated =
      questions.filter(
        (_, i) => i !== index
      )

    setQuestions(updated)

  }

  // Submit

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !pollData.title.trim()
    ) {

      alert(
        "Poll title required"
      )

      return

    }

    for (const q of questions) {

      if (
        !q.question.trim()
      ) {

        alert(
          "Question cannot be empty"
        )

        return

      }

      const validOptions =
        q.options.filter(
          (opt) => opt.trim()
        )

      if (
        validOptions.length < 2
      ) {

        alert(
          "Each question needs at least 2 options"
        )

        return

      }

    }

  const cleanedQuestions =
  questions.map((q) => ({

    ...q,

    options:

      q.options

        .filter(
          (opt) => opt.trim()
        )

        .map((opt) => ({

          text: opt,

          votes: 0

        }))

  }))

    const finalData = {

      ...pollData,

      allowAnonymous:

        pollData.responseMode ===
          "anonymous" ||

        pollData.responseMode ===
          "both",

      allowAuthenticated:

        pollData.responseMode ===
          "authenticated" ||

        pollData.responseMode ===
          "both",

      questions:
        cleanedQuestions

    }

    try {

      setLoading(true)

      const response =
        await api.post(

          "/polls/create",

          finalData,

          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }

        )

      console.log(
        response.data
      )

      alert(
        "Poll Created Successfully 🚀"
      )

      setPollData({
        title: "",
        description: "",
        expiresAt: null,
        responseMode: "both",
        publishResults: true,
      })

      setQuestions([
        {
          question: "",
          required: true,
          options: ["", ""]
        }
      ])

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        "Failed to create poll"
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-[#fff8f1]">

      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Hero */}

        <div className="mb-10">

          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium mb-5">

            PulseBoard ☕

          </div>

          <h1 className="text-5xl font-black text-stone-900">

            Create a Poll 🚀

          </h1>

          <p className="text-stone-500 mt-3 text-lg">

            Build engaging live polls with beautiful analytics.

          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Poll Details */}

          <div className="bg-white border-2 border-stone-800 rounded-[32px] p-8 shadow-[8px_8px_0px_#f97316]">

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-stone-800">

                1. Poll Details

              </h2>

              <p className="text-stone-500 mt-2">

                Basic information about your poll

              </p>

            </div>

            <div className="space-y-6">

              {/* Title */}

              <div>

                <label className="block mb-2 font-semibold text-stone-800">

                  Poll Title

                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter poll title"
                  value={pollData.title}
                  onChange={handlePollChange}
                  className="w-full border border-orange-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Description */}

              <div>

                <label className="block mb-2 font-semibold text-stone-800">

                  Description

                </label>

                <textarea
                  name="description"
                  placeholder="Describe your poll..."
                  value={pollData.description}
                  onChange={handlePollChange}
                  rows="4"
                  className="w-full border border-orange-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>

          </div>

          {/* Settings */}

          <div className="bg-white border-2 border-stone-800 rounded-[32px] p-8 shadow-[8px_8px_0px_#fdba74]">

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-stone-800">

                2. Poll Settings ⚙️

              </h2>

              <p className="text-stone-500 mt-2">

                Configure response mode and poll expiry

              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {/* Response Mode */}

              <div>

                <label className="block mb-3 font-semibold text-stone-800 text-lg">

                  Response Mode

                </label>

                <select

                  value={pollData.responseMode}

                  onChange={(e) =>

                    setPollData({

                      ...pollData,

                      responseMode:
                        e.target.value

                    })

                  }

                  className="w-full border border-orange-200 rounded-2xl px-5 py-4 bg-white outline-none focus:ring-4 focus:ring-orange-100"

                >

                  <option value="anonymous">

                    Anonymous Only

                  </option>

                  <option value="authenticated">

                    Authenticated Only

                  </option>

                  <option value="both">

                    Both anonymous + authenticated

                  </option>

                </select>

              </div>

              {/* Expiry */}

              <div>

                <label className="block mb-3 font-semibold text-stone-800 text-lg">

                  Expiry Date & Time

                </label>

                {/* Quick Buttons */}

                <div className="flex flex-wrap gap-3 mb-5">

                  {

                    [
                      {
                        label: "5 min",
                        value: 5
                      },
                      {
                        label: "15 min",
                        value: 15
                      },
                      {
                        label: "30 min",
                        value: 30
                      },
                      {
                        label: "1 Day",
                        value: 1440
                      },
                      {
                        label: "7 Days",
                        value: 10080
                      }
                    ].map((item) => {

                      const isActive =

                        pollData.expiresAt &&

                        Math.abs(

                          (
                            new Date(
                              pollData.expiresAt
                            ) - new Date()
                          ) /

                          (1000 * 60)

                          - item.value

                        ) < 2

                      return (

                        <button

                          key={item.label}

                          type="button"

                          onClick={() => {

                            const date =
                              new Date(

                                Date.now() +

                                item.value *

                                60 *

                                1000

                              )

                            setPollData({

                              ...pollData,

                              expiresAt: date

                            })

                          }}

                          className={`px-5 py-3 rounded-2xl border-2 font-semibold transition-all duration-300

                          ${

                            isActive

                              ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"

                              : "bg-white text-stone-700 border-orange-200 hover:border-orange-400 hover:bg-orange-50"

                          }`}

                        >

                          {item.label}

                        </button>

                      )

                    })

                  }

                </div>

                {/* Custom Date */}

                <DatePicker

                  selected={
                    pollData.expiresAt
                  }

                  onChange={(date) =>

                    setPollData({

                      ...pollData,

                      expiresAt: date

                    })

                  }

                  showTimeSelect

                  timeFormat="hh:mm aa"

                  timeIntervals={15}

                  dateFormat="MMMM d, yyyy h:mm aa"

                  placeholderText="Or choose custom expiry date"

                  minDate={new Date()}

                  className="w-full border border-orange-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-orange-100"

                />

              </div>

            </div>

          </div>

          {/* Questions */}

          <div className="space-y-6">

            {

              questions.map(
                (q, qIndex) => (

                  <div
                    key={qIndex}
                    className="bg-white border-2 border-stone-800 rounded-[32px] p-8 shadow-[8px_8px_0px_#fdba74]"
                  >

                    {/* Header */}

                    <div className="flex items-center justify-between mb-6">

                      <h2 className="text-2xl font-bold text-stone-800">

                        Question {qIndex + 1}

                      </h2>

                      <button
                        type="button"
                        onClick={() =>
                          deleteQuestion(
                            qIndex
                          )
                        }
                        className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition"
                      >

                        <Trash2 size={20} />

                      </button>

                    </div>

                    {/* Question */}

                    <input
                      type="text"
                      placeholder="Enter your question"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(
                          qIndex,
                          e.target.value
                        )
                      }
                      className="w-full border border-orange-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-orange-100 mb-6"
                    />

                    {/* Options */}

                    <div className="space-y-4">

                      {

                        q.options.map(
                          (
                            option,
                            oIndex
                          ) => (

                            <div
                              key={oIndex}
                              className="flex items-center gap-3"
                            >

                              <input
                                type="text"
                                placeholder={`Option ${oIndex + 1}`}
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    qIndex,
                                    oIndex,
                                    e.target.value
                                  )
                                }
                                className="flex-1 border border-orange-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-orange-100"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeOption(
                                    qIndex,
                                    oIndex
                                  )
                                }
                                disabled={
                                  q.options.length <= 2
                                }
                                className={`p-4 rounded-2xl transition ${
                                  q.options.length <= 2
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-red-50 hover:bg-red-100 text-red-500"
                                }`}
                              >

                                <Trash2 size={18} />

                              </button>

                            </div>

                          )
                        )

                      }

                    </div>

                    {/* Add Option */}

                    <button
                      type="button"
                      onClick={() =>
                        addOption(qIndex)
                      }
                      className="mt-5 text-orange-600 font-medium flex items-center gap-2"
                    >

                      <Plus size={18} />

                      Add Option

                    </button>

                  </div>

                )
              )

            }

          </div>

          {/* Add Question */}

          <button
            type="button"
            onClick={addQuestion}
            className="w-full border-2 border-dashed border-orange-300 text-orange-600 py-5 rounded-[28px] hover:bg-orange-50 transition font-semibold text-lg"
          >

            + Add New Question

          </button>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-[1.01] text-white py-5 rounded-[28px] text-lg font-semibold transition-all duration-300 shadow-[6px_6px_0px_#7c2d12] flex items-center justify-center gap-3"
          >

            {

              loading ? (

                <>

                  <Loader2
                    className="animate-spin"
                    size={20}
                  />

                  Creating Poll...

                </>

              ) : (

                <>
                  Create Poll 🚀
                </>

              )

            }

          </button>

        </form>

      </div>

    </div>

  )

}

export default CreatePoll