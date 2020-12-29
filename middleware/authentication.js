//IMPORTS
//dependency
const crypt = require('bcrypt')
const uuid = require('uuid')
//local
const {add_one, get_one} = require('../models/general')
const settings = require('../config/settings')

//GLOBAL VARIABLES
const TABLE = 'users'

//TEMP move to more global position
class error {
    constructor({type, field=null, code=null, detail=null}) {
        this.type = type
        this.field = field
        this.code = code
        this.detail = detail
    }
}

const grant_access_to_user = async (req, res, next) => {
    //skip if errors
    if(req.errors.length) {next(); return}

    try {
        if(!req.user && req.body.username) req.user = await get_one('users', {username: req.body.username})
        const uid = uuid.v4()
        const timestamp = 'make a tool for this'
        await add_one('online', {user: req.user.id, uid, timestamp})
    } catch(err) {
        req.errors.push(new error({type: 'database', detail: 'Database broked, try again later.'}))
    }

    next()
}

const verify_credentials = async (req, res, next) => {
    //initialize error variable if not already
    req.errors = req.errors ? req.errors : []

    //check if there is a username field
    if(!req.body.username)
        req.errors.push(new error({type: 'missing field', field: 'username'}))
    //check if there is a password field
    if(!req.body.password)
        req.errors.push(new error({type: 'missing field', field: 'password'}))

    //skip database calls if errors
    if(req.errors.length) {next(); return}

    //check if user exists
    req.user = await get_one('users', {username: req.body.username})
    if(!req.user.password)
        req.errors.push(new error({type: 'unknown user', detail: 'username not found.'}))
    
    //check if password is correct
    if(!(req.user.password && crypt.compareSync(req.body.password, req.user.password)))
        req.errors.push(new error({type: 'incorrect password', field: 'password', detail: 'Wrong password given.'}))

    //if no errors; add token
    if(!req.errors.length)
        req.token = uuid.v4()

    next()
}

const password_criteria = (req, res, next) => {
    //initialize error variable if not already
    req.errors = req.errors ? req.errors : []

    //check if there is a password field
    if(!req.body.password) {
        req.errors.push(new error({type: 'missing field', field: 'password'}))
        next(); return
    }

    //CHECK PASSWORD CRITERIA
        //check password length
        if(req.body.password.length < settings.password_length)
            req.errors.push(new error({
                type: 'field length',
                field: 'password',
                detail: `Password must be longer than ${settings.password_length} characters.`}))
    
    //HASH PASSWORD
    if(!req.errors.length) //only hash password if it's going to be used
        req.body.password = crypt.hashSync(req.body.password, settings.password_difficulty)

    next()
}

const username_criteria = async (req, res, next) => {
    //add global middleware to do this
    req.errors = []

    //check if there is a username field
    if(!req.body.username) {
        req.errors.push(new error({
            type: 'missing field',
            field: 'username'}))
        next(); return
    }

    //CHECK IF CRITERIA IS MET
        //clean up username
        if(req.body.username !== req.body.username.replace(/\W/g, ''))
            req.errors.push(new error({
                type:' invalid characters',
                field:' username',
                detail:' Only alphanumeric allowed.'}))

        //check username length
        if(req.body.username.length < settings.username_min_length || req.body.username.length > settings.username_max_length)
            req.errors.push(new error({
                type: 'field length',
                field: 'username',
                detail: `Username must be between ${settings.username_min_length} and ${settings.username_max_length} characters.`}))

        //skip if criteria isn't met
        if(req.errors.length) {next(); return}
    
    //check if username is unique
    if(await get_one(TABLE, {username: req.body.username}))
        req.errors.push(new error({
            type: 'duplicate',
            field: 'username',
            detail: 'Username already exists.'}))

    next()
}



module.exports = {
    username_criteria,
    password_criteria,
    verify_credentials,
    grant_access_to_user
}