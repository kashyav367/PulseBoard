import ApiError from "../../common/utils/ApiError.js"

export const submitResponseValidator = (req, res, next) => {
    const { answers } = req.body

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
        throw ApiError.badRequest("Answers must be a non-empty array")
    }

    answers.forEach((answer, idx) => {
        if (answer.questionIndex === undefined || answer.questionIndex === null) {
            throw ApiError.badRequest(`Answer at index ${idx} is missing questionIndex`)
        }
        if (!answer.selectedOption || typeof answer.selectedOption !== "string") {
            throw ApiError.badRequest(`Answer at index ${idx} is missing selectedOption string`)
        }
    })

    next()
}
