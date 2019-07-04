'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Size extends Model {
  static boot () {
    super.boot()

    this.addHook('afterUpdate', 'SizeHook.updateProductSizesPrice')
  }

  image () {
    return this.belongsTo('App/Models/Image')
  }

  category () {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Size
