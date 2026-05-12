import { Router } from "express"

import authMiddleware from "../../common/middleware/authMiddleware.js"

import validateMiddleware from "../../common/middleware/validateMiddleware.js"

import { createPollController } from "./poll.controller.js"

import {  createPollValidator } from "./poll.validator.js"

import { getMyPollsController } from "./poll.controller.js"

import { getSinglePollController } from "./poll.controller.js"

import { publishPollController } from "./poll.controller.js"

import { getPublishedResultController } from "./poll.controller.js"
const router = Router()



router.post(

    "/create",

    authMiddleware,

    validateMiddleware(createPollValidator),

    createPollController

)

router.get(

   "/my-polls",

   authMiddleware,

   getMyPollsController

)

router.get(

   "/:id",

   getSinglePollController

)

router.patch(

   "/publish/:id",

   authMiddleware,

   publishPollController

)

router.get(

   "/results/:id",

   getPublishedResultController

)



export default router