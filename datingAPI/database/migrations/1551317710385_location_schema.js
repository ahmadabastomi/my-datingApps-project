'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocationSchema extends Schema {
  up() {
    this.create('locations', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('location').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('locations')
  }
}

module.exports = LocationSchema
