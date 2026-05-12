import { Router } from "express"

import {

   submitResponseController

} from "./response.controller.js"



const router = Router()



router.post(

   "/:pollId",

   submitResponseController

)



export default router