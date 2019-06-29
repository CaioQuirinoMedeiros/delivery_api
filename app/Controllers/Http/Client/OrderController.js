/* eslint-disable camelcase */
'use strict'

const Order = use('App/Models/Order')

class OrderController {
  async index ({ response, request, auth }) {
    const status = request.input('status')
    const user = await auth.getUser()

    const query = Order.query()
      .where('user_id', user.id)
      .orderBy('created_at', 'DESC')

    if (status) {
      query.where('status', status)
    }
    try {
      const orders = await query.fetch()

      return response.status(200).send(orders)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar pedidos' })
    }
  }

  async store ({ request, response, auth }) {
    const data = request.only([
      'observations',
      'zip_code',
      'district',
      'street',
      'number'
    ])
    const items = request.input('items')

    const user = await auth.getUser()

    try {
      if (!Array.isArray(items) || !items.length) throw Error

      let order = await Order.create({ ...data, user_id: user.id })

      await order.items().createMany(items)

      order = await Order.find(order.id)

      return response.status(201).send(order)
    } catch (err) {
      console.log(err)

      return response.status(400).send({ message: 'Erro ao criar pedido' })
    }
  }

  async show ({ response, params, auth }) {
    const user = await auth.getUser()

    try {
      const order = await Order.query()
        .where({ user_id: user.id, id: params.id })
        .firstOrFail()

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
    } catch (err) {
      console.log(err)

      return response.status(400).send({ message: 'Erro ao deletar pedido' })
    }
  }
}

module.exports = OrderController
