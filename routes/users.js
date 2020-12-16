//IMPORTS
// const model = require('../config/models')
// const mw = require('../moddleware')
// const {log_error} = require('../tools/errors')

module.exports = (app) => {
    app.post('/user/register', register)
    app.post('/user/login', login)
    app.post('/user/logout', logout)
    app.post('/user/credits', credits)
    app.post('/user/game', game)
}

const register = async (req, res) => {
    res.status(200).send('register')
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