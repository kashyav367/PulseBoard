import { Router } from "express"

import passport from "passport"

import jwt from "jsonwebtoken"

const router = Router()

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

  async (

    req,

    res

  ) => {

    const token = jwt.sign(

      {

        email:
          req.user.email,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "7d",

      }

    )

    res.redirect(

      `${process.env.FRONTEND_URL}/auth-success?token=${token}`

    )

  }

)

export default router