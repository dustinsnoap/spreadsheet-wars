//IMPORTS
const {get_one} = require('../models/general')

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

const check_username = async (req, res, next) => {
    //add global middleware to do this
    req.errors = []

    //check if there is a username field
    if(!req.body.username) {
        req.errors.push(new error({type:'missing field', field:'username'}))
        next(); return
    }

    //CHECK IF CRITERIA IS MET
        //clean up username
        if(req.body.username !== req.body.username.replace(/\W/g, ''))
            req.errors.push(new error({type:'invalid characters', field:'username', detail:'Only alphanumeric allowed.'}))

        //check username length
        if(req.body.username.length < 3 || req.body.username.length > 16)
            req.errors.push(new error({type:'field length', field:'username', detail:'Username must be between 3 and 16 characters.'}))

        //skip if criteria isn't met
        if(req.errors.length) {next(); return}
    
    //check if username is unique
    if(await get_one(TABLE, {username: req.body.username}))
        req.errors.push(new error({type:'duplicate', field:'username', detail:'Username already exists.'}))

    next()
}



module.exports = {
    check_username
}