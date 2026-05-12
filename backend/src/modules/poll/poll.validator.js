import ApiError from "../../common/utils/ApiError.js"



export const createPollValidator = (

    req,

    res,

    next

) => {

    const { title, questions } = req.body



    if (!title) {

        throw ApiError.badRequest(

            "Title is required"

        )

    }



    if (!questions || questions.length === 0) {

        throw ApiError.badRequest(

            "At least one question required"

        )

    }



    next()

}