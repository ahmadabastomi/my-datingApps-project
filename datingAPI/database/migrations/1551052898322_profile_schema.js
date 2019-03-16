'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up() {
    this.create('profiles', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name').notNullable()
      table.string('gender').notNullable()
      table.string('birth_date').notNullable()
      table.string('phone_number').notNullable()
      table.string('job_title').nullable()
      table.string('job_company').nullable()
      table.string('school').nullable()
      table.string('account_social_media').nullable()
      table.string('about_me').nullable()
      table.string('avatar').nullable()
      table.timestamps()
    })
  }
  down() {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
