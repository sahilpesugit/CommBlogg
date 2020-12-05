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

router.patch('/posts/:postId', (req, res) => {
    Post.findOne({_id: req.params.postId})
        .then(mypost => {
            if(req.query.hasOwnProperty("vote")) {
                if(req.query.vote === "up"){
                    if(mypost.votes == undefined)
                        mypost.votes = 1;
                    else 
                        mypost.votes = mypost.votes + 1
                } else if(req.query.vote === "down"){
                    if(mypost.votes == undefined || mypost.votes === 0)
                        mypost.votes = 0;
                    else 
                        mypost.votes = mypost.votes - 1
                }
                mypost.save()
                    .then(result => {
                        res.json({ post: result })
                    })
                    .catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(401)
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
        picture: pic,
        postedBy: req.user,
        votes: 0
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
