exports.up = knex =>
    knex.schema.createTable('items', table => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable()
        table.unique(['game', 'name'])
        table.integer('game')
            .references('id')
            .inTable('games')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.varchar('name', 16)
            .notNullable()
        table.varchar('type', 16)
        table.integer('value')
            .notNullable()
            .defaultTo(0)
        table.integer('buy_price')
            .notNullable()
            .defaultTo(0)
        table.integer('sell_price')
            .notNullable()
            .defaultTo(0)
        table.smallint('scout_chance')
            .notNullable()
            .defaultTo(0)
        table.integer('scout_bonus_dependant')
            .references('id')
            .inTable('items')
        table.integer('scout_bonus')
            .notNullable()
            .defaultTo(0)
        table.integer('scout_cash')
            .notNullable()
            .defaultTo(0)
        table.integer('disp_cash')
            .notNullable()
            .defaultTo(0)
        table.smallint('produce_chance')
            .notNullable()
            .defaultTo(0)
        table.smallint('kill_chance')
            .notNullable()
            .defaultTo(0)
    })

exports.down = knex =>
    knex.schema.dropTableIfExists('items')