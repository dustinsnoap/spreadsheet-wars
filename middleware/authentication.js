//IMPORTS
const {get_one} = require('../models/general')

//GLOBAL VARIABLES
const TABLE = 'users'

//TEMP move to more global position
class error {
    constructor(type, field=null, code=null) {
        this.type = type
        this.field = field
        this.code = code
    }
}

const check_username = async (req, res, next) => {
    //add global middleware to do this
    req.errors = []

    //check if there is a username field
    if(!req.body.username)
        req.errors.push(new error('missing field', 'username'))

    //clean up username
        //regex to make it only alphanumeric
    
    //check if username fits criteria
        //add a settings config to configure this
    
    //check if username is unique
    const test = await get_one(TABLE, {username: 'farts'})
    console.log('test', test)
    if(await get_one(TABLE, {username: 'farts'}))
        req.errors.push(new error('duplicate', 'username'))

    next()
}



module.exports = {
    check_username
}