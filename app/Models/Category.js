'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  image () {
    return this.belongsTo('App/Models/Image')
  }

  products () {
    return this.belongsToMany('App/Models/Product')
  }

  sizes () {
    return this.belongsToMany('App/Models/Size')
  }
}

module.exports = Category
