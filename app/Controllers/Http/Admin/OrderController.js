/* eslint-disable camelcase */
'use strict'

const Order = use('App/Models/Order')

class OrderController {
  async index ({ response, request }) {
    const status = request.input('status')

    const query = Order.query()

    if (status) {
      query.where('status', status)
    }
    try {
      const orders = await query
        .orderBy('created_at', 'DESC')
        .with('user')
        .with('items.product_size.product.image')
        .with('items.product_size.size')
        .fetch()

      return response.status(200).send(orders)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar pedidos' })
    }
  }

  async store ({ request, response }) {
    const data = request.only([
      'user_id',
      'observations',
      'zip_code',
      'district',
      'street',
      'number'
    ])
    const items = request.input('items')

    try {
      if (!Array.isArray(items) || !items.length) throw Error

      let order = await Order.create(data)

      await order.items().createMany(items)

      order = await Order.find(order.id)

      return response.status(201).send(order)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao criar pedido' })
    }
  }

  async show ({ response, params }) {
    try {
      const order = await Order.findOrFail(params.id)

      await order.loadMany({
        user: null,
        items: item =>
          item.with('product_size.product').with('product_size.size')
      })

      return response.status(200).send(order)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao exibir pedido' })
    }
  }

  async update ({ params, request, response }) {
    const data = request.only([
      'user_id',
      'observations',
      'zip_code',
      'district',
      'street',
      'number',
      'status'
    ])
    const items = request.input('items')

    try {
      let order = await Order.findOrFail(params.id)

      order.merge(data)

      if (items && Array.isArray(items) && items.length) {
        await order.items().delete()
        await order.items().createMany(items)
      }

      await order.save()

      order = await Order.find(order.id)

      return response.status(200).send(order)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao editar pedido' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const order = await Order.findOrFail(params.id)

      await order.delete()

      return response.status(200).send()
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao deletar pedido' })
    }
  }
}

module.exports = OrderController
