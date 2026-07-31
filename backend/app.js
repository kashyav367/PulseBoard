import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import connectDB from "./src/common/config/db.js"
import authRoutes from "./src/modules/auth/auth.routes.js"
import errorMiddleware from "./src/common/middleware/errorMiddleware.js"
import authMiddleware from "./src/common/middleware/authMiddleware.js"
import pollRoutes from "./src/modules/poll/poll.routes.js"
import responseRoutes from "./src/modules/response/response.routes.js"
import analyticsRoutes from "./src/modules/analytics/analytics.routes.js"
import passport from "./src/common/config/passport.js"

const app = express()



const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "https://pulseboard.vercel.app",
  "http://localhost:3000"
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      callback(null, true)
    } else {
      callback(null, true) // Allow during dev/flexible access
    }
  },
  credentials: true
}))

app.use(express.json({ limit: "10mb" }))
app.use(passport.initialize())

// DB Connection Check Middleware
app.use((req, res, next) => {
  // Exclude static health check route
  if (req.path === "/") return next()
  
  if (mongoose.connection.readyState !== 1) {
    connectDB() // Attempt reconnection
    return res.status(503).json({
      success: false,
      message: "Database connection is offline. Please check MONGO_URI in Render Dashboard & IP Whitelist (0.0.0.0/0) in MongoDB Atlas."
    })
  }
  next()
})



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