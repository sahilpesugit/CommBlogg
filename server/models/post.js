const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
    votes: {
        type: Number
    }
})
mongoose.model("Post", postSchema)