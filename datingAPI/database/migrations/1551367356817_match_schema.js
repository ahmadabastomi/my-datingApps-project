'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up() {
    this.create('matches', (table) => {
      table.increments()
      table.integer('user_a').nullable()
      table.integer('user_b').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('matches')
  }
}

module.exports = MatchSchema
