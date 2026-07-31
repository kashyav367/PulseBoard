import bcrypt from "bcryptjs"
import generateToken from "../../common/utils/generateToken.js"
import User from "./user.model.js"
import ApiError from "../../common/utils/ApiError.js"

export const registerUserService = async (userData) => {
    const { name, email, password } = userData

    if (!name || !email || !password) {
        throw ApiError.badRequest("Name, email, and password are required")
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })

    if (existingUser) {
        throw ApiError.badRequest("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword
    })

    const createdUser = await User.findById(user._id).select("-password")
    const token = generateToken(createdUser)

    return {
        user: createdUser,
        token
    }
}

export const loginUserService = async (userData) => {
    const { email, password } = userData

    if (!email || !password) {
        throw ApiError.badRequest("Email and password are required")
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })

    if (!user) {
        throw ApiError.badRequest("User not found")
    }

    if (!user.password) {
        throw ApiError.badRequest("Please login using Google OAuth")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        throw ApiError.badRequest("Invalid credentials")
    }

    const token = generateToken(user)
    const loggedInUser = await User.findById(user._id).select("-password")

    return {
        user: loggedInUser,
        token
    }
}

export const getMeService = async (userId) => {
    if (!userId) {
        throw ApiError.unauthorized("User ID missing")
    }

    const user = await User.findById(userId).select("-password")
    if (!user) {
        throw ApiError.notFound("User not found")
    }

    return user
}