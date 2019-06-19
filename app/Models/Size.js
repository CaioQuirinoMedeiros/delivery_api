'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Size extends Model {
  image () {
    return this.belongsTo('App/Models/Image')
  }

  category () {
    return this.belongsTo('App/Models/Category')
  }

  products () {
    return this.belongsToMany('App/Models/Product')
  }
}

module.exports = Size
