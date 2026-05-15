import Response from "./response.model.js"

import Poll from "../poll/poll.model.js"

import ApiError from "../../common/utils/ApiError.js"

import { io } from "../../../server.js"

export const submitResponseService = async (

    pollId,

    answers,

    userId = null

) => {

    // CHECK POLL

    const poll = await Poll.findById(

        pollId

    )

    if (!poll) {

        throw ApiError.notFound(

            "Poll not found"

        )

    }

    // CHECK EXPIRY

    if (

        poll.expiresAt &&

        new Date() > poll.expiresAt

    ) {

        throw ApiError.badRequest(

            "Poll expired"

        )

    }

    // PREVENT MULTIPLE RESPONSES

    if (userId) {

        const existingResponse =
            await Response.findOne({

                poll: pollId,

                user: userId

            })

        if (existingResponse) {

            throw ApiError.badRequest(

                "You already submitted a response"

            )

        }

    }

    // UPDATE VOTES

    answers.forEach((answer) => {

        const question =
            poll.questions[
              answer.questionIndex
            ]

        if (!question) return

        const option =
            question.options.find(

                (opt) =>

                    opt.text ===
                    answer.selectedOption

            )

        if (option) {

            option.votes += 1

        }

    })

    // SAVE UPDATED POLL

    await poll.save()

    // LIVE SOCKET UPDATE

    io.to(
      pollId.toString()
    ).emit(

      "vote_updated",

      poll

    )

    // SAVE RESPONSE

    const response =
        await Response.create({

            poll: pollId,

            user: userId,

            answers

        })

    return response

}