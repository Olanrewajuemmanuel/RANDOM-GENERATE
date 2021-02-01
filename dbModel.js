const mongoose = require("mongoose")

const dbSchema = mongoose.Schema({
    random_code: {
        type: String,
        required: true
    },
    position: {
        type: Number,
    },
    random_point: {
        type: Number,
        default: Math.random()
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Model = mongoose.model("api_schema", dbSchema)