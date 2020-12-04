const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { route } = require('./auth')
const loginreq = require('../middleware/loginreq')
const Post = mongoose.model("Post")

router.get('/allposts', (req, res) => {
    Post.find()
        .populate("postedBy", "_id name email")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createpost', loginreq, (req, res) => {
    const { title, body, pic } = req.body
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please Enter Title and Content." })
    }
    req.user.password = undefined
    const post = new Post({
        title: title,
        body: body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        })
})

router.get('/myposts', loginreq, (req, res) => {
    Post.find({ postedBy: (req.user._id) })
        .populate("postedBy", "_id name email")
        .then(myposts => {
            res.json({ myposts })
        })
        .catch(err => {
            console.log(err)
        })

})

module.exports = router
