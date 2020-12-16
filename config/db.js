const knex = require('knex')
const config = ('../knexfile')
const env = process.env.DB_ENV || 'development'

module.exports = knex(config[env])