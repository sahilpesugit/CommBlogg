const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const { mongoURI } = require('./keys')


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("MongoDB connected.")
})
mongoose.connection.on('error', (err) => {
    console.log("error connecting", err)
})

require("./models/user")
require("./models/post")

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT, () => {
    console.log("server is running on ", PORT)
})