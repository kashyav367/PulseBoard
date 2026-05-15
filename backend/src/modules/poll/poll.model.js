import mongoose from "mongoose"

const optionSchema = new mongoose.Schema({

  text: {

    type: String,

    required: true,

    trim: true

  },

  votes: {

    type: Number,

    default: 0

  }

})

const questionSchema = new mongoose.Schema({

  question: {

    type: String,

    required: true,

    trim: true

  },

  options: {

    type: [optionSchema],

    validate: [

      (val) => val.length >= 2,

      "At least 2 options required"

    ]

  },

  required: {

    type: Boolean,

    default: false

  }

})

const pollSchema = new mongoose.Schema({

  title: {

    type: String,

    required: true,

    trim: true

  },

  description: {

    type: String,

    trim: true,

    default: "No description added"

  },

  questions: {

    type: [questionSchema],

    required: true

  },

  // Poll Owner
  createdBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true

  },

  // Participation Modes
  allowAnonymous: {

    type: Boolean,

    default: true

  },

  allowAuthenticated: {

    type: Boolean,

    default: false

  },

  // Poll Expiry
  expiresAt: {

    type: Date

  },

  // Results Visibility
  isPublished: {

    type: Boolean,

    default: false

  },

  // Poll Status
  status: {

    type: String,

    enum: ["draft", "published", "expired"],

    default: "draft"

  }

}, {

  timestamps: true

})

const Poll = mongoose.model(
  "Poll",
  pollSchema
)

export default Poll