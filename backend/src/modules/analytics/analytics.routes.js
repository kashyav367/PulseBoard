import { Router } from "express"

import {

   getPollAnalyticsController

} from "./analytics.controller.js"



const router = Router()



router.get(

   "/:pollId",

   getPollAnalyticsController

)



export default router