'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductSize extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', 'ProductSizeHook.calculatePrice')
  }
  static get traits () {
    return ['App/Models/Traits/NoTimestamp']
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

  size () {
    return this.belongsTo('App/Models/Size')
  }
}

module.exports = ProductSize
