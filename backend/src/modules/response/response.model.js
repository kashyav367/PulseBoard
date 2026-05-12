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



const Response = mongoose.model(

    "Response",

    responseSchema

)



export default Response