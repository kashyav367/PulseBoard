import Response from "../response/response.model.js"
import Poll from "../poll/poll.model.js"
import ApiError from "../../common/utils/ApiError.js"

export const getPollAnalyticsService = async (pollIdOrSlug, requestingUserId = null) => {
    let poll
    if (pollIdOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        poll = await Poll.findById(pollIdOrSlug)
    } else {
        poll = await Poll.findOne({ slug: pollIdOrSlug })
    }

    if (!poll) {
        throw ApiError.notFound("Poll not found")
    }

    const responses = await Response.find({ poll: poll._id })

    const anonymousResponses = responses.filter((res) => !res.user).length
    const authenticatedResponses = responses.filter((res) => res.user).length

    const questionAnalytics = poll.questions.map((q, qIndex) => {
        const optionStats = q.options.map((opt) => {
            const votesCount = responses.reduce((count, response) => {
                const answer = response.answers.find(a => a.questionIndex === qIndex)
                if (answer && (answer.selectedOption.trim() === opt.text.trim() || answer.selectedOption === opt._id?.toString())) {
                    return count + 1
                }
                return count
            }, 0)

            const totalQuestionResponses = responses.length
            const percentage = totalQuestionResponses > 0 ? ((votesCount / totalQuestionResponses) * 100).toFixed(1) : "0.0"

            return {
                optionId: opt._id,
                text: opt.text,
                votes: votesCount,
                percentage: parseFloat(percentage)
            }
        })

        return {
            questionId: q._id,
            questionText: q.question,
            required: q.required,
            options: optionStats,
            totalVotes: responses.length
        }
    })

    return {
        pollId: poll._id,
        pollTitle: poll.title,
        description: poll.description,
        slug: poll.slug,
        isPublished: poll.isPublished,
        status: poll.status,
        createdAt: poll.createdAt,
        expiresAt: poll.expiresAt,
        totalResponses: responses.length,
        anonymousResponses,
        authenticatedResponses,
        questions: poll.questions,
        analytics: questionAnalytics
    }
}