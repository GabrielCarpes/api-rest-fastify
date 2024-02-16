import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.uuid('session_id').after('id').index()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.enum('type', ['debit', 'credit']).defaultTo('credit').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
