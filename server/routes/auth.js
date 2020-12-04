const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = mongoose.model("User")
const { JWT } = require('../keys')
const reqLogin = require('../middleware/loginreq')
const loginreq = require('../middleware/loginreq')

router.get('/protected', loginreq, (req, res) => {
    res.send("YOU HAVE ACCESSED PROTECTED CONTENT!")
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please enter all the valid credentials." })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists!" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpass => {
                    const user = new User({
                        email,
                        password: hashedpass,
                        name
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "New user successfully registered." })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "provide email AND password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or Password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        /*res.json({ message: "Sign in Successful." })*/
                        const token = jwt.sign({ _id: savedUser._id }, JWT)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router

