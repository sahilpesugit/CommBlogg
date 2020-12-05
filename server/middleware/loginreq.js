const jwt = require("jsonwebtoken")
const { JWT } = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).json({ error: "You must be Logged in!" })
    }
    console.log(req.headers.authorization)
    const token = JSON.parse(req.headers.authorization.replace("Bearer ", ""))
    const { _id } = token
    User.findById(_id)
    .then(userdata => {
        req.user = userdata
        next()
    })
    .catch(err => {
        return res.status(401).json({ error: "You must be Logged in!" })
    })

}