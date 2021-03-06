exports.up = knex =>
    knex.schema.createTable('online', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.text('token')
            .notNullable()
        table.integer('user')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.integer('player')
            .references('id')
            .inTable('players')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.integer('game')
            .references('id')
            .inTable('games')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.text('timestamp')
            .notNullable()
    })

exports.down = knex =>
    knex.schema.dropTableIfExists('online')