import ApiError from "../../common/utils/ApiError.js"

export const registerValidator =  (req, res, next) => {

    const { name, email, password } = req.body


    if (!name) {

        throw ApiError.badRequest("Name is required")

    }


    if (!email) {

        throw ApiError.badRequest("Email is required")

    }



    if (!password) {

        throw ApiError.badRequest("Password is required")

    }


    if (password.length < 6) {

        throw ApiError.badRequest(

            "Password must be at least 6 characters"

        )

    }

    next()

}

export const loginValidator = async (

    req,

    res,

    next

) => {

    const { email, password } = req.body



    if (!email) {

        throw ApiError.badRequest(

            "Email is required"

        )

    }



    if (!password) {

        throw ApiError.badRequest(

            "Password is required"

        )

    }



    next()

}