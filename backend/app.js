import express from "express"
import cors from "cors"

import authRoutes from "./src/modules/auth/auth.routes.js"

import errorMiddleware from "./src/common/middleware/errorMiddleware.js"

import authMiddleware from "./src/common/middleware/authMiddleware.js"

import pollRoutes from "./src/modules/poll/poll.routes.js"

import responseRoutes from "./src/modules/response/response.routes.js"

import analyticsRoutes from "./src/modules/analytics/analytics.routes.js"



const app = express()



app.use(cors())
app.use(express.json())



app.get("/", (req, res) => {

    res.send("PulseBoard API Running 🚀")

})



// TEMP PROTECTED ROUTE

app.get(

   "/protected",

   authMiddleware,

   (req, res) => {

      res.json({

         success: true,

         message: "Protected route accessed",

         user: req.user

      })

   }

)



app.use("/api/auth", authRoutes)
app.use("/api/polls", pollRoutes)
app.use("/api/responses", responseRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use(errorMiddleware)



export default app