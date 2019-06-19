'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSizeSchema extends Schema {
  up () {
    this.create('product_sizes', table => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table
        .integer('size_id')
        .unsigned()
        .references('id')
        .inTable('sizes')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_sizes')
  }
}

module.exports = ProductSizeSchema
