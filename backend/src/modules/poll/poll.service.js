import Poll from "./poll.model.js"

import ApiError from "../../common/utils/ApiError.js"

// ==========================
// CREATE POLL
// ==========================

export const createPollService = async (

  pollData,

  userId

) => {

  // AUTH CHECK
  if (!userId) {

    throw ApiError.unauthorized(
      "Unauthorized access"
    )

  }

  // VALIDATE QUESTIONS

  pollData.questions.forEach(

    (question) => {

      // Minimum 2 options

      if (

        !question.options ||

        question.options.length < 2

      ) {

        throw ApiError.badRequest(

          "Each question must have at least 2 options"

        )

      }

      // Empty question validation

      if (

        !question.question?.trim()

      ) {

        throw ApiError.badRequest(

          "Question is required"

        )

      }

    }

  )

  // CREATE POLL

  const poll = await Poll.create({

    ...pollData,

    createdBy: userId

  })

  return poll

}

// ==========================
// GET MY POLLS
// ==========================

export const getMyPollsService = async (

  userId

) => {

  // AUTH CHECK

  if (!userId) {

    throw ApiError.unauthorized(

      "Unauthorized access"

    )

  }

  const polls = await Poll.find({

    createdBy: userId

  }).sort({

    createdAt: -1

  })

  return polls

}

// ==========================
// GET SINGLE POLL
// ==========================

export const getSinglePollService = async (

  pollId

) => {

  const poll = await Poll.findById(

    pollId

  )

  if (!poll) {

    throw ApiError.notFound(

      "Poll not found"

    )

  }

  return poll

}

// ==========================
// PUBLISH POLL
// ==========================

export const publishPollService = async (

  pollId

) => {

  const poll = await Poll.findById(

    pollId

  )

  if (!poll) {

    throw ApiError.notFound(

      "Poll not found"

    )

  }

  poll.isPublished = true

  await poll.save()

  return poll

}

// ==========================
// GET PUBLISHED RESULTS
// ==========================

export const getPublishedResultService = async (

  pollId

) => {

  const poll = await Poll.findById(

    pollId

  )

  if (!poll) {

    throw ApiError.notFound(

      "Poll not found"

    )

  }

  if (!poll.isPublished) {

    throw ApiError.forbidden(

      "Results not published yet"

    )

  }

  return poll

}