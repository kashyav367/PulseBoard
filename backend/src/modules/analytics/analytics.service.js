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



            return {

                question:

                    question.question,



                totalResponses:

                    responses.length,



                optionCounts

            }

        }

    )



    return analytics

}