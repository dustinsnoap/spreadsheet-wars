//IMPORTS
// const model = require('../config/models')
const mw = require('../middleware/authentication')
const {add_one} = require('../models/general')
// const {log_error} = require('../tools/errors')

module.exports = (app) => {
    app.post('/user/register', mw.username_criteria, mw.password_criteria, register)
    app.post('/user/login', login)
    app.post('/user/logout', logout)
    app.post('/user/credits', credits)
    app.post('/user/game', game)
}

const register = async (req, res) => {
    //check for password field
    //check for errors
    if(req.errors.length) {
        res.status(400).send({errors: req.errors})
        return
    }
    try {
        await add_one('users', req.body)
    } catch(err) {
        console.log(err)
    }
    res.status(200).send('registered')
}

const login = async (req, res) => {
    res.status(200).send('login')
}

const logout = async (req, res) => {
    res.status(200).send('logout')
}

const credits = async (req, res) => {
    //buy credits
    //use credits
    res.status(200).send('credits')
}

const game = async (req, res) => {
    //create game
    //join game
    res.status(200).send('game')
}