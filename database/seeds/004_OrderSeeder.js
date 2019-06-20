'use strict'

/*
|--------------------------------------------------------------------------
| OrderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Order = use('App/Models/Order')

class OrderSeeder {
  async run () {
    const orders = await Factory.model('App/Models/Order').createMany(10)

    await Promise.all(
      orders.map(async order => {
        await order.items().createMany([
          {
            product_size_id: Math.ceil(Math.random() * 24),
            quantity: Math.ceil(Math.random() * 2)
          },
          {
            product_size_id: Math.ceil(Math.random() * 24),
            quantity: Math.ceil(Math.random() * 3)
          },
          {
            product_size_id: Math.ceil(Math.random() * 24),
            quantity: Math.ceil(Math.random() * 5)
          }
        ])

        await Order.find(order.id)
      })
    )
  }
}

module.exports = OrderSeeder
