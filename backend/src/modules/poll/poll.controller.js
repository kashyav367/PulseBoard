import ApiResponse from "../../common/utils/ApiResponse.js"
import {
  createPollService,
  getMyPollsService,
  getSinglePollService,
  updatePollService,
  deletePollService,
  publishPollService,
  getPublishedResultService
} from "./poll.service.js"

export const createPollController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id
    const poll = await createPollService(req.body, userId)
    return ApiResponse.send(res, 201, "Poll created successfully", poll)
  } catch (error) {
    next(error)
  }
}

export const getMyPollsController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id
    const polls = await getMyPollsService(userId)
    return ApiResponse.send(res, 200, "Polls fetched successfully", polls)
  } catch (error) {
    next(error)
  }
}

export const getSinglePollController = async (req, res, next) => {
  try {
    const poll = await getSinglePollService(req.params.id)
    return ApiResponse.send(res, 200, "Poll fetched successfully", poll)
  } catch (error) {
    next(error)
  }
}

export const updatePollController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id
    const poll = await updatePollService(req.params.id, req.body, userId)
    return ApiResponse.send(res, 200, "Poll updated successfully", poll)
  } catch (error) {
    next(error)
  }
}

export const deletePollController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id
    const result = await deletePollService(req.params.id, userId)
    return ApiResponse.send(res, 200, result.message, null)
  } catch (error) {
    next(error)
  }
}

export const publishPollController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id
    const poll = await publishPollService(req.params.id, userId)
    return ApiResponse.send(res, 200, "Poll published successfully", poll)
  } catch (error) {
    next(error)
  }
}

export const getPublishedResultController = async (req, res, next) => {
  try {
    const poll = await getPublishedResultService(req.params.id)
    return ApiResponse.send(res, 200, "Published results fetched", poll)
  } catch (error) {
    next(error)
  }
}