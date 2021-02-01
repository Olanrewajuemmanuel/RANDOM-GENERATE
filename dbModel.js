const mongoose = require("mongoose")

let random = Math.random()

const dbSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    random_code: {
        type: String,
        required: true
    },
    position: {
        type: Number,
    },
    random_point: {
        type: Number,
        default: random
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Model = mongoose.model("api_schema", dbSchema)