import { submitResponseService } from "./response.service.js"
import ApiResponse from "../../common/utils/ApiResponse.js"

export const submitResponseController = async (req, res, next) => {
    try {
        const { answers } = req.body
        const userId = req.user?.id || req.user?._id || null
        const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress

        const response = await submitResponseService(
            req.params.pollId,
            answers,
            userId,
            clientIp
        )

        return ApiResponse.send(
            res,
            201,
            "Response submitted successfully",
            response
        )
    } catch (error) {
        next(error)
    }
}