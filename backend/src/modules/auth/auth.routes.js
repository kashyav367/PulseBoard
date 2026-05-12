import { Router } from "express"

import { loginController, registerController } from "./auth.controller.js"

import { loginValidator, registerValidator } from "./auth.validator.js"

import validateMiddleware from "../../common/middleware/validateMiddleware.js"



const router = Router()



router.post(

    "/register",

    validateMiddleware(registerValidator),

    registerController

)

router.post("/login",validateMiddleware(loginValidator), loginController )


export default router