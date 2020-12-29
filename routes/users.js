//IMPORTS
// const model = require('../config/models')
const mw = require('../middleware/authentication')
const {add_one} = require('../models/general')
// const {log_error} = require('../tools/errors')

module.exports = (app) => {
    app.post('/user/register', mw.username_criteria, mw.password_criteria, register)
    app.post('/user/login', mw.verify_credentials, login)
    app.post('/user/logout', logout)
    app.post('/user/credits', credits)
    app.post('/user/game', game)
}

const register = async (req, res) => {
    //check for errors
    if(req.errors.length) {res.status(400).send({errors: req.errors}); return}

    //add new user to database
    try {await add_one('users', req.body)} 
    catch(err) {res.status(400).send(err)}

    //everything was successful
    res.status(200).send(`new user ${req.body.username} added.`)
}

const login = async (req, res) => {
    //check for errors
    if(req.errors.length) {res.status(400).send({errors: req.errors}); return}

    //log user in and send back user token
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