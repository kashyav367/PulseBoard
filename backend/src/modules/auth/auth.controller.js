import { registerUserService } from "./auth.service.js"
import ApiResponse from "../../common/utils/ApiResponse.js"
import { loginUserService } from "./auth.service.js"



export const registerController = async (req, res, next) => {

    try {

        const user = await registerUserService(req.body)



        return ApiResponse.send(

            res,

            201,

            "User registered successfully",

            user

        )

    } catch (error) {

        next(error)

    }

}

export const loginController = async (

    req,

    res,

    next

) => {

    try {

        const data = await loginUserService(

            req.body

        )



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