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
const User = use('App/Models/User')

class OrderSeeder {
  async run () {
    const orders = await Factory.model('App/Models/Order').createMany(10)

    const clientUser = await User.findBy('email', 'caio2@gmail.com')

    const clientOrders = await Order.createMany([
      {
        user_id: clientUser.id,
        observations: 'Quero minha pizza sem queijo, por favor',
        zip_code: '71680369',
        district: 'Setor Habitacional Jardim Botânico',
        street: 'Condomínio Jardim Botânico VI',
        number: '14'
      },
      {
        user_id: clientUser.id,
        observations: 'Macarrão é bom',
        zip_code: '71680369',
        district: 'Setor Habitacional Jardim Botânico',
        street: 'Condomínio Jardim Botânico VI',
        number: '14'
      }
    ])

    await Promise.all(
      orders.map(async order => {
        await order.items().createMany([
          {
            product_size_id: Math.ceil(Math.random() * 35),
            quantity: Math.ceil(Math.random() * 2)
          },
          {
            product_size_id: Math.ceil(Math.random() * 35),
            quantity: Math.ceil(Math.random() * 3)
          },
          {
            product_size_id: Math.ceil(Math.random() * 35),
            quantity: Math.ceil(Math.random() * 5)
          }
        ])

        await Order.find(order.id)
      })
    )

    await clientOrders[0].items().createMany([
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 2)
      },
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 5)
      }
    ])

    await Order.find(clientOrders[0].id)

    await clientOrders[1].items().createMany([
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 2)
      },
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 5)
      },
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 1)
      },
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 3)
      },
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 7)
      },
      {
        product_size_id: Math.ceil(Math.random() * 35),
        quantity: Math.ceil(Math.random() * 5)
      }
    ])

    await Order.find(clientOrders[1].id)
  }
}

module.exports = OrderSeeder
