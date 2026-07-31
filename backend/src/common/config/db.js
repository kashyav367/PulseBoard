import mongoose from "mongoose"

const connectDB = async () => {
    try {
      if (!process.env.MONGO_URI) {
        console.log("MongoDB Error: MONGO_URI environment variable is missing!")
        return
      }
      await mongoose.connect(process.env.MONGO_URI)
      console.log("MongoDB connected successfully 🚀")
    }
    catch(error) {
      console.log("MongoDB Connection Error:", error.message)
      console.log("Please check MONGO_URI environment variable in Render Dashboard / .env")
    }
}

export default connectDB;