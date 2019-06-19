'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SizeSchema extends Schema {
  up () {
    this.create('sizes', table => {
      table.increments()
      table.string('size').notNullable()
      table.decimal('multiplier', 10, 2).defaultTo(1)
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table
        .integer('image_id')
        .unsigned()
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')
      table.timestamps()
    })

    this.create('product_size', table => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('size_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('sizes')
  }
}

module.exports = SizeSchema
