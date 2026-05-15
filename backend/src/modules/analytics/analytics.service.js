import Response from "../response/response.model.js"

import Poll from "../poll/poll.model.js"

import ApiError from "../../common/utils/ApiError.js"

export const getPollAnalyticsService = async (

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

    const responses = await Response.find({

        poll: pollId

    })

    // PARTICIPATION INSIGHTS

    const anonymousResponses =
        responses.filter(

            (response) => !response.user

        ).length

    const authenticatedResponses =
        responses.filter(

            (response) => response.user

        ).length

    // QUESTION ANALYTICS

    const analytics = poll.questions.map(

        (question, index) => {

            const optionCounts = {}

            question.options.forEach(

                (option) => {

                    optionCounts[option] = 0

                }

            )

            responses.forEach((response) => {

                const answer =
                    response.answers.find(

                        (a) =>

                            a.questionIndex === index

                    )

                if (answer) {

                    optionCounts[
                        answer.selectedOption
                    ]++

                }

            })

            // PERCENTAGES

            const percentages = {}

            Object.keys(optionCounts).forEach(

                (option) => {

                    percentages[option] =

                        responses.length > 0

                            ? (

                                (
                                    optionCounts[
                                        option
                                    ] /

                                    responses.length

                                ) * 100

                            ).toFixed(1)

                            : 0

                }

            )

            return {

                question:
                    question.question,

                totalResponses:
                    responses.length,

                optionCounts,

                percentages

            }

        }

    )

    return {

        pollTitle: poll.title,

        totalResponses:
            responses.length,

        anonymousResponses,

        authenticatedResponses,

        analytics

    }

}