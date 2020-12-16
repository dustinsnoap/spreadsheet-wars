//IMPORTS
// const model = require('../config/models')
// const mw = require('../moddleware')
// const {log_error} = require('../tools/errors')

module.exports = (app) => {
    app.post('/action', query)
}

const query = async (req, res) => {
    res.status(200).send(true)
}