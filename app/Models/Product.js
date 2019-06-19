'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  image () {
    return this.belongsTo('App/Models/Image')
  }

  categories () {
    return this.belongsToMany('App/Models/Category')
  }

  sizes () {
    return this.hasMany('App/Models/ProductSize')
  }
}

module.exports = Product
