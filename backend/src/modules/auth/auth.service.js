import bcrypt from "bcryptjs"
import generateToken from "../../common/utils/generateToken.js"
import User from "./auth.model.js"

import ApiError from "../../common/utils/ApiError.js"



export const registerUserService = async (userData) => {

    const { name, email, password } = userData


    const existingUser = await User.findOne({ email })


    if (existingUser) {

        throw ApiError.badRequest("User already exists")

    }


    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await User.create({

        name,

        email,

        password: hashedPassword

    })

    

    const createdUser = await User
        .findById(user._id)
        .select("-password")


    return createdUser

}



export const loginUserService = async (userData) => {

    const { email, password } = userData


    const user = await User.findOne({ email })


    if (!user) {

        throw ApiError.badRequest(

            "User not found"

        )

    }


    const isPasswordCorrect = await bcrypt.compare(

        password,

        user.password

    )


    if (!isPasswordCorrect) {

        throw ApiError.badRequest(

            "Invalid credentials"

        )

    }


    const token = generateToken(user)


    const loggedInUser = await User
        .findById(user._id)
        .select("-password")


    return {

        user: loggedInUser,

        token

    }

}