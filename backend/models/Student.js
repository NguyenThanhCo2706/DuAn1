const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    gender: {
        type: Boolean,
    },
    birth: {
        type: Date,
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model("Student", userSchema)