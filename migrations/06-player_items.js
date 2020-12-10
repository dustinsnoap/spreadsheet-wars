exports.up = knex =>
    knex.schema.createTable('player_items', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.integer('player')
            .references('id')
            .inTable('players')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.integer('item')
            .references('id')
            .inTable('items')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.bigint('amount')
            .notNullable()
            .defaultTo(0)
    })

exports.down = knex =>
    knex.schema.dropTableIfExists('player_items')