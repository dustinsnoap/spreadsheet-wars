exports.up = knex =>
    knex.schema.createTable('player_alliances', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
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
        table.varchar('role', 16)
            .notNullable()
            .defaultTo('member')
    })

exports.down = knex =>
    knex.schema.dropTableIfExists('player_alliances')