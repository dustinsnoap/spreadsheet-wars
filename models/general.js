//IMPORTS
const db = require('../config/db')

//MODELS
const add_one = async (tbl, obj) =>
    (await db(tbl).insert(obj).returning('*'))[0]

const get_one = async (tbl, obj) => 
    (await db(tbl).where(obj))[0]

//EXPORTS
module.exports = {
    add_one,
    get_one
}