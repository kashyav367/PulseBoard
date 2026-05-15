import { Router } from "express"

import authMiddleware from "../../common/middleware/authMiddleware.js"

import validateMiddleware from "../../common/middleware/validateMiddleware.js"

import {
  createPollController,
  getMyPollsController,
  getSinglePollController,
  publishPollController,
  getPublishedResultController
} from "./poll.controller.js"

import {
  createPollValidator
} from "./poll.validator.js"

import {
  getPollAnalyticsController
} from "../analytics/analytics.controller.js"

const router = Router()

// ==========================
// CREATE POLL
// ==========================
router.post(

  "/create",

  authMiddleware,

  validateMiddleware(
    createPollValidator
  ),

  createPollController

)

// ==========================
// GET LOGGED IN USER POLLS
// ==========================
router.get(

  "/my-polls",

  authMiddleware,

  getMyPollsController

)

// ==========================
// GET POLL ANALYTICS
// ==========================
router.get(

  "/analytics/:pollId",

  authMiddleware,

  getPollAnalyticsController

)

// ==========================
// GET PUBLISHED RESULTS
// ==========================
router.get(

  "/results/:id",

  getPublishedResultController

)

// ==========================
// GET SINGLE POLL
// ==========================
router.get(

  "/:id",

  getSinglePollController

)

// ==========================
// PUBLISH RESULTS
// ==========================
router.patch(

  "/publish/:id",

  authMiddleware,

  publishPollController

)

export default router