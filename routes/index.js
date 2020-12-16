//ROUTES
const actions = require('./actions')
const queries = require('./queries')

//EXPORT
module.exports = app => {
    actions(app)
    queries(app)
}