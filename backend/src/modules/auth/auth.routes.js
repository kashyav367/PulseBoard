import { Router } from "express"
import passport from "passport"
import generateToken from "../../common/utils/generateToken.js"
import authMiddleware from "../../common/middleware/authMiddleware.js"
import { registerController, loginController, getMeController } from "./auth.controller.js"

const router = Router()

// LOCAL AUTH ROUTES
router.post("/register", registerController)
router.post("/login", loginController)
router.get("/me", authMiddleware, getMeController)

// GOOGLE LOGIN
router.get(
  "/google",
  passport.authenticate(
    "google",
    {
      scope: [
        "profile",
        "email"
      ],
    }
  )
)

// GOOGLE CALLBACK
router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      session: false,
    }
  ),
  async (req, res) => {
    const token = generateToken(req.user)
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"
    res.redirect(`${frontendUrl}/auth-success?token=${token}`)
  }
)

export default router