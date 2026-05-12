import Response from "./response.model.js"

import Poll from "../poll/poll.model.js"

import ApiError from "../../common/utils/ApiError.js"



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



    // SAVE RESPONSE

    const response = await Response.create({

        poll: pollId,

        user: userId,

        answers

    })



    return response

}