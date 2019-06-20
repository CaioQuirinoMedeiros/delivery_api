'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemSchema extends Schema {
  up () {
    this.create('order_items', table => {
      table.increments()
      table.integer('quantity').unsigned()
      table.decimal('subtotal', 12, 2)
      table
        .integer('product_size_id')
        .unsigned()
        .references('id')
        .inTable('product_sizes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })

    this.create('order_item_product_size', table => {
      table.increments()
      table
        .integer('order_item_id')
        .unsigned()
        .references('id')
        .inTable('order_items')
        .onDelete('cascade')
      table
        .integer('product_size_id')
        .unsigned()
        .references('id')
        .inTable('product_sizes')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('order_item_product_size')
    this.drop('order_items')
  }
}

module.exports = OrderItemSchema
