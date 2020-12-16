//ROUTES
const actions = require('./actions')
const queries = require('./queries')
const users = require('./users')

//EXPORT
module.exports = app => {
    actions(app)
    queries(app)
    users(app)
}