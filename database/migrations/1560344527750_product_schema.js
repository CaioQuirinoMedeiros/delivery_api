'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', table => {
      table.increments()
      table.string('name').notNullable()
      table.decimal('base_price', 12, 2).notNullable()
      table
        .integer('image_id')
        .unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })

    this.create('category_product', table => {
      table.increments()
      table.integer('product_id').unsigned()
      table.integer('category_id').unsigned()

      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('cascade')
      table
        .foreign('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('category_product')
    this.drop('products')
  }
}

module.exports = ProductSchema
