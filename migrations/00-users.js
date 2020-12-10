exports.up = knex =>
    knex.schema.createTable('users', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.varchar('username', 16)
            .unique()
            .notNullable()
        table.text('password')
            .notNullable()
        table.text('email')
            .unique()
        table.integer('credits')
    })

exports.down = knex =>
    knex.schema.dropTableIfExists('users')