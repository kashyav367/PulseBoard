import Response from "./response.model.js"
import Poll from "../poll/poll.model.js"
import ApiError from "../../common/utils/ApiError.js"
import { io } from "../../../server.js"

export const submitResponseService = async (
    pollId,
    answers,
    userId = null,
    clientIp = null
) => {
    // 1. CHECK POLL
    let poll
    if (pollId.match(/^[0-9a-fA-F]{24}$/)) {
        poll = await Poll.findById(pollId)
    } else {
        poll = await Poll.findOne({ slug: pollId })
    }

    if (!poll) {
        throw ApiError.notFound("Poll not found")
    }

    // 2. CHECK EXPIRY
    if (poll.expiresAt && new Date() > new Date(poll.expiresAt)) {
        poll.status = "expired"
        await poll.save()
        throw ApiError.badRequest("This poll has expired and is no longer accepting responses")
    }

    // 3. CHECK PARTICIPATION PERMISSIONS
    if (poll.allowAuthenticated && !userId) {
        throw ApiError.forbidden("This poll requires you to log in before submitting a response")
    }

    if (!poll.allowAnonymous && !userId) {
        throw ApiError.forbidden("Anonymous submissions are not allowed for this poll")
    }

    // 4. PREVENT DUPLICATE RESPONSES
    if (userId) {
        const existingUserResponse = await Response.findOne({
            poll: poll._id,
            user: userId
        })
        if (existingUserResponse) {
            throw ApiError.badRequest("You have already submitted a response to this poll")
        }
    } else if (clientIp) {
        const existingAnonResponse = await Response.findOne({
            poll: poll._id,
            anonymousIp: clientIp
        })
        if (existingAnonResponse) {
            throw ApiError.badRequest("A response has already been submitted from your device/connection")
        }
    }

    // 5. MANDATORY QUESTION VALIDATION
    if (!answers || !Array.isArray(answers)) {
        throw ApiError.badRequest("Answers payload must be an array")
    }

    poll.questions.forEach((q, index) => {
        if (q.required) {
            const answered = answers.find(a => a.questionIndex === index && a.selectedOption)
            if (!answered) {
                throw ApiError.badRequest(`Question ${index + 1} ("${q.question}") is required`)
            }
        }
    })

    // 6. UPDATE VOTES
    answers.forEach((answer) => {
        const question = poll.questions[answer.questionIndex]
        if (!question) return

        const option = question.options.find(
            (opt) => opt.text.trim() === answer.selectedOption.trim() || opt._id?.toString() === answer.selectedOption
        )

        if (option) {
            option.votes += 1
        }
    })

    await poll.save()

    // 7. SAVE RESPONSE DOCUMENT
    const response = await Response.create({
        poll: poll._id,
        user: userId,
        anonymousIp: userId ? null : clientIp,
        answers
    })

    // 8. REAL-TIME SOCKET BROADCAST
    if (io) {
        io.to(poll._id.toString()).emit("vote_updated", poll)
    }

    return response
}