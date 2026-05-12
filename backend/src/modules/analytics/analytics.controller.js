import {

   getPollAnalyticsService

} from "./analytics.service.js"

import ApiResponse

from "../../common/utils/ApiResponse.js"



export const getPollAnalyticsController = async (

    req,

    res,

    next

) => {

    try {

        const analytics =

            await getPollAnalyticsService(

                req.params.pollId

            )



        return ApiResponse.send(

            res,

            200,

            "Analytics fetched successfully",

            analytics

        )



    } catch (error) {

        next(error)

    }

}