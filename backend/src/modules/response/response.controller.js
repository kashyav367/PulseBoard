import {
  submitResponseService
} from "./response.service.js"

import ApiResponse
  from "../../common/utils/ApiResponse.js"

export const submitResponseController = async (

    req,

    res,

    next

) => {

    try {

        const { answers } = req.body

        const response =
            await submitResponseService(

                req.params.pollId,

                answers,

                req.user?._id || null

            )

        return ApiResponse.send(

            res,

            201,

            "Response submitted successfully",

            response

        )

    } catch (error) {

        console.log(error)

        next(error)

    }

}