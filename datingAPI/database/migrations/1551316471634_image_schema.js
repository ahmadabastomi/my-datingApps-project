'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up() {
    this.create('images', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('image').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('images')
  }
}

module.exports = ImageSchema
