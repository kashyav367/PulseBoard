import Poll from "./poll.model.js"
import ApiError from "../../common/utils/ApiError.js"


export const createPollService = async (

    pollData,

    userId

) => {

    // VALIDATE QUESTIONS

    pollData.questions.forEach((question) => {

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

        if (!question.question?.trim()) {

            throw ApiError.badRequest(

                "Question is required"

            )

        }

    })

  const poll = await Poll.create({

    ...pollData,

    createdBy:
      userId || "507f1f77bcf86cd799439011"

})

    return poll

}

export const getMyPollsService = async (

    userId

) => {

    let polls

    if (userId) {

        polls = await Poll.find({

            createdBy: userId

        }).sort({

            createdAt: -1

        })

    } else {

        polls = await Poll.find()

        .sort({

            createdAt: -1

        })

    }

    return polls

}

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



export const publishPollService =
  async (
    pollId
  ) => {

    const poll =
      await Poll.findById(
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