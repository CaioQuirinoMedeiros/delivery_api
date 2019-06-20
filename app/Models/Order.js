'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static boot () {
    super.boot()

    this.addHook('afterFind', 'OrderHook.updateTotal')
  }
  items () {
    return this.hasMany('App/Models/OrderItem')
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }
}

module.exports = Order
