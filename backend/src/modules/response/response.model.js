import mongoose from "mongoose"

const responseSchema = new mongoose.Schema({

    poll: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Poll"

    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    anonymousIp: {
        type: String,
        default: null
    },

    answers: [
        {
            questionIndex: Number,
            selectedOption: String
        }
    ]
},
{
    timestamps: true
})

responseSchema.index({ poll: 1, user: 1 }, { sparse: true })
responseSchema.index({ poll: 1, anonymousIp: 1 }, { sparse: true })



const Response = mongoose.model(

    "Response",

    responseSchema

)



export default Response