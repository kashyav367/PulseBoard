import { Router } from "express"
import jwt from "jsonwebtoken"
import { submitResponseController } from "./response.controller.js"
import validateMiddleware from "../../common/middleware/validateMiddleware.js"
import { submitResponseValidator } from "./response.validator.js"

const router = Router()

// Optional token middleware for response submission
const optionalAuthMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization
   if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1]
      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         const userId = decoded.id || decoded._id
         req.user = { ...decoded, id: userId, _id: userId }
      } catch (err) {
         // Invalid token - treat as unauthenticated
      }
   }
   next()
}

router.post(
   "/:pollId",
   optionalAuthMiddleware,
   validateMiddleware(submitResponseValidator),
   submitResponseController
)

export default router