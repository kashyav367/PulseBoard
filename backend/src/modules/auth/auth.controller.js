import { registerUserService, loginUserService, getMeService } from "./auth.service.js"
import ApiResponse from "../../common/utils/ApiResponse.js"

export const registerController = async (req, res, next) => {
    try {
        const data = await registerUserService(req.body)
        return ApiResponse.send(
            res,
            201,
            "User registered successfully",
            data
        )
    } catch (error) {
        next(error)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const data = await loginUserService(req.body)
        return ApiResponse.send(
            res,
            200,
            "Login successful",
            data
        )
    } catch (error) {
        next(error)
    }
}

export const getMeController = async (req, res, next) => {
    try {
        const user = await getMeService(req.user?.id || req.user?._id)
        return ApiResponse.send(
            res,
            200,
            "User details fetched successfully",
            user
        )
    } catch (error) {
        next(error)
    }
}