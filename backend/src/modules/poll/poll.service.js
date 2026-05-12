import Poll from "./poll.model.js"
import ApiError from "../../common/utils/ApiError.js"


export const createPollService = async (

    pollData,

    userId

) => {

    const poll = await Poll.create({

        ...pollData,

        createdBy: userId

    })



    return poll

}



export const getMyPollsService = async (

    userId

) => {

    const polls = await Poll.find({

        createdBy: userId

    }).sort({

        createdAt: -1

    })



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


export const publishPollService = async (

    pollId,

    userId

) => {

    const poll = await Poll.findOne({

        _id: pollId,

        createdBy: userId

    })



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