import jwt from "jsonwebtoken"

import ApiError from "../utils/ApiError.js"



const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization



        if (!authHeader) {

            throw ApiError.unauthorized(

                "Token not found"

            )

        }



        // EXTRACT TOKEN

        const token = authHeader.split(" ")[1]



        if (!token) {

            throw ApiError.unauthorized(

                "Invalid token"

            )

        }



        // VERIFY TOKEN

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        )



        const userId = decoded.id || decoded._id
        req.user = {
            ...decoded,
            id: userId,
            _id: userId
        }

        next()

    } catch (error) {

        next(error)

    }

}

export default authMiddleware