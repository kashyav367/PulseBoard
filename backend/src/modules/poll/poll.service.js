import Poll from "./poll.model.js"
import Response from "../response/response.model.js"
import ApiError from "../../common/utils/ApiError.js"

const generateSlug = (title) => {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
  const random = Math.floor(1000 + Math.random() * 9000)
  return `${cleanTitle || "poll"}-${random}`
}

// ==========================
// CREATE POLL
// ==========================
export const createPollService = async (pollData, userId) => {
  if (!userId) {
    throw ApiError.unauthorized("Unauthorized access")
  }

  if (!pollData.questions || !Array.isArray(pollData.questions) || pollData.questions.length === 0) {
    throw ApiError.badRequest("At least one question is required")
  }

  pollData.questions.forEach((question) => {
    if (!question.options || question.options.length < 2) {
      throw ApiError.badRequest("Each question must have at least 2 options")
    }

    if (!question.question?.trim()) {
      throw ApiError.badRequest("Question text cannot be empty")
    }

    question.options.forEach((opt) => {
      if (!opt.text || !opt.text.trim()) {
        throw ApiError.badRequest("Option text cannot be empty")
      }
    })
  })

  const slug = generateSlug(pollData.title || "poll")

  const poll = await Poll.create({
    ...pollData,
    slug,
    createdBy: userId,
    status: pollData.isPublished ? "published" : "draft"
  })

  return poll
}

// ==========================
// GET MY POLLS
// ==========================
export const getMyPollsService = async (userId) => {
  if (!userId) {
    throw ApiError.unauthorized("Unauthorized access")
  }

  const polls = await Poll.find({ createdBy: userId }).sort({ createdAt: -1 })
  return polls
}

// ==========================
// GET SINGLE POLL (BY ID OR SLUG)
// ==========================
export const getSinglePollService = async (pollIdOrSlug) => {
  let poll
  if (pollIdOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    poll = await Poll.findById(pollIdOrSlug)
  } else {
    poll = await Poll.findOne({ slug: pollIdOrSlug })
  }

  if (!poll) {
    throw ApiError.notFound("Poll not found")
  }

  // Auto check expiry status
  if (poll.expiresAt && new Date() > new Date(poll.expiresAt) && poll.status !== "expired") {
    poll.status = "expired"
    await poll.save()
  }

  return poll
}

// ==========================
// UPDATE POLL
// ==========================
export const updatePollService = async (pollId, updateData, userId) => {
  const poll = await Poll.findById(pollId)

  if (!poll) {
    throw ApiError.notFound("Poll not found")
  }

  if (poll.createdBy.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not authorized to update this poll")
  }

  if (updateData.title) poll.title = updateData.title
  if (updateData.description !== undefined) poll.description = updateData.description
  if (updateData.expiresAt !== undefined) poll.expiresAt = updateData.expiresAt
  if (updateData.allowAnonymous !== undefined) poll.allowAnonymous = updateData.allowAnonymous
  if (updateData.allowAuthenticated !== undefined) poll.allowAuthenticated = updateData.allowAuthenticated

  if (updateData.questions && Array.isArray(updateData.questions)) {
    poll.questions = updateData.questions
  }

  await poll.save()
  return poll
}

// ==========================
// DELETE POLL
// ==========================
export const deletePollService = async (pollId, userId) => {
  const poll = await Poll.findById(pollId)

  if (!poll) {
    throw ApiError.notFound("Poll not found")
  }

  if (poll.createdBy.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not authorized to delete this poll")
  }

  await Poll.findByIdAndDelete(pollId)
  await Response.deleteMany({ poll: pollId })

  return { message: "Poll and associated responses deleted successfully" }
}

// ==========================
// PUBLISH POLL
// ==========================
export const publishPollService = async (pollId, userId) => {
  const poll = await Poll.findById(pollId)

  if (!poll) {
    throw ApiError.notFound("Poll not found")
  }

  if (poll.createdBy.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not authorized to publish this poll")
  }

  poll.isPublished = true
  poll.status = "published"

  await poll.save()
  return poll
}

// ==========================
// GET PUBLISHED RESULTS
// ==========================
export const getPublishedResultService = async (pollIdOrSlug) => {
  let poll
  if (pollIdOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    poll = await Poll.findById(pollIdOrSlug)
  } else {
    poll = await Poll.findOne({ slug: pollIdOrSlug })
  }

  if (!poll) {
    throw ApiError.notFound("Poll not found")
  }

  if (!poll.isPublished) {
    throw ApiError.forbidden("Results not published yet")
  }

  return poll
}