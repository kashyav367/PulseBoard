import { useEffect, useState } from "react"

import {
  useParams,
  useNavigate
} from "react-router-dom"

import api from "../services/api"

import Navbar from "../components/Navbar"

function PollForm() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [poll, setPoll] = useState(null)

  const [answers, setAnswers] = useState({})

  // Fetch Poll

  useEffect(() => {

    const fetchPoll = async () => {

      try {

        const response = await api.get(

          `/polls/${id}`

        )

        setPoll(response.data.data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchPoll()

  }, [id])

  // Handle Option Select

  const handleSelect = (
    questionIndex,
    option
  ) => {

    setAnswers({
      ...answers,
      [questionIndex]: option
    })

  }

  // Submit

  const handleSubmit = async (e) => {

    e.preventDefault()

    // Required Validation

    for (
      let index = 0;
      index < poll.questions.length;
      index++
    ) {

      const q = poll.questions[index]

      if (
        q.required &&
        !answers[index]
      ) {

        alert(
          `Please answer: ${q.question}`
        )

        return

      }

    }

    try {

      const formattedAnswers =
        Object.entries(answers).map(

          ([questionIndex, selectedOption]) => ({

            questionIndex:
              Number(questionIndex),

            selectedOption

          })

        )

      const response =
        await api.post(

          `/responses/${id}`,

          {
            answers:
              formattedAnswers
          }

        )

      console.log(response.data)

alert(
  "Response Submitted Successfully 🚀"
)

const updatedPoll =
  await api.get(
    `/polls/${id}`
  )

if (
  updatedPoll.data.data
    .isPublished
) {

  navigate(
    `/analytics/${poll._id}`
  )

}

    } catch (error) {

      console.log(error)

      alert(
        "Something went wrong"
      )

    }

  }

  // Loading UI

  if (!poll) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#fff8f1]">

        <h1 className="text-3xl font-black text-orange-500">

          Loading Poll...

        </h1>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-[#fff8f1]">

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-[32px] p-10 text-white shadow-[8px_8px_0px_#7c2d12] mb-10">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <h1 className="text-5xl font-black mb-3">

                {poll.title}

              </h1>

              <p className="text-lg opacity-90">

                {poll.description}

              </p>

            </div>

            <div className="bg-white/20 px-5 py-3 rounded-2xl font-semibold">

              {

                poll.expiresAt

                  ? new Date(
                      poll.expiresAt
                    ).toLocaleString()

                  : "No Expiry"

              }

            </div>

          </div>

        </div>

        {/* Questions */}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {

            poll.questions.map(
              (q, index) => (

                <div
                  key={index}
                  className="bg-white border-2 border-stone-800 rounded-[28px] p-8 shadow-[6px_6px_0px_#fdba74]"
                >

                  {/* Question */}

                  <div className="flex items-center gap-3 mb-8 flex-wrap">

                    <h2 className="text-3xl font-bold text-stone-800">

                      Q{index + 1}. {q.question}

                    </h2>

                    {

                      q.required && (

                        <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">

                          Required

                        </span>

                      )

                    }

                  </div>

                  {/* Options */}

                  <div className="space-y-4">

                    {

                      q.options.map(
                        (
                          option,
                          optionIndex
                        ) => (

                          <label
                            key={optionIndex}
                            className={`flex items-center gap-4 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200

                            ${

                              answers[index] === option.text

                                ? "border-orange-500 bg-orange-50"

                                : "border-orange-200 hover:bg-orange-50"

                            }`}
                          >

                            <input
                              type="radio"
                              name={`question-${index}`}
                              checked={
                                answers[index] === option.text
                              }
                              onChange={() =>
                                handleSelect(
                                  index,
                                  option.text
                                )
                              }
                              className="accent-orange-500 w-5 h-5"
                            />

                            <span className="text-lg font-medium text-stone-700">

                              {option.text}

                            </span>

                          </label>

                        )

                      )

                    }

                  </div>

                </div>

              )

            )

          }

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-[1.01] text-white py-5 rounded-[28px] text-lg font-semibold transition-all duration-300 shadow-[6px_6px_0px_#7c2d12]"
          >

            Submit Response 🚀

          </button>

        </form>

      </div>

    </div>

  )

}

export default PollForm