'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', table => {
      table.increments()
      table.string('path', 255).notNullable()
      table.integer('size').unsigned()
      table.string('original_name')
      table.string('extension', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
