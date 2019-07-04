'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductSize extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', 'ProductSizeHook.calculatePrice')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

  size () {
    return this.belongsTo('App/Models/Size')
  }

  items () {
    return this.belongsToMany('App/Models/OrderItem')
  }
}

module.exports = ProductSize
