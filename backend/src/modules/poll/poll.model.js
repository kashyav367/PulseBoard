import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({

  question: {

    type: String,

    required: true,

    trim: true

  },

  options: [

    {

      text: {

        type: String,

        required: true,

        trim: true

      },

      votes: {

        type: Number,

        default: 0

      }

    }

  ],

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

    trim: true

  },

  questions: [questionSchema],

  createdBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true

  },

  // Anonymous participation

  allowAnonymous: {

    type: Boolean,

    default: true

  },

  // Authenticated participation

  allowAuthenticated: {

    type: Boolean,

    default: false

  },

  // Poll expiry

  expiresAt: {

    type: Date

  },

  // Final results published or not

  isPublished: {

    type: Boolean,

    default: false

  }

}, {

  timestamps: true

})

const Poll = mongoose.model(
  "Poll",
  pollSchema
)

export default Poll