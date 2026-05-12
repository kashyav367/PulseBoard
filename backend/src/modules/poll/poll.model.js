import mongoose from "mongoose"


const questionSchema = new mongoose.Schema({

    question: {

        type: String,

        required: true

    },



    options: [

        {

            type: String,

            required: true

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

        required: true

    },



    description: {

        type: String

    },



    questions: [questionSchema],



    createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },



    allowAnonymous: {

        type: Boolean,

        default: true

    },



    expiresAt: {

        type: Date

    },



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