const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reqiured: true
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model("User", userSchema)