// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

// IMPORTS
require('./motd')

// SETUP
const app = express()
const PORT = process.env.PORT || 3337

// GLOBAL MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(express.json())

// API

// SERVER MESSAGE
app.listen(PORT, () => {
    console.clear()
    console.log(motd(PORT))
})