/* eslint-disable camelcase */
'use strict'

const Order = use('App/Models/Order')
const Database = use('Database')

class OrderController {
  async index ({ response, request, pagination }) {
    const { page, limit } = pagination
    const status = request.input('status')

    const query = Order.query()

    if (status) {
      query.where('status', status)
    }
    try {
      const orders = await query
        .with('items.product_size.product')
        .paginate(page, limit)

      return response.status(200).send(orders)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar pedidos' })
    }
  }

  async store ({ request, response }) {
    const { user_id, items } = request.all()

    try {
      const order = await Order.create({ user_id })

      if (!Array.isArray(items) || !items.length) {
        return response
          .status(400)
          .send({ message: 'Nenhum item para criar pedido' })
      }

      await order.items().createMany(items)

      order.total = await order.items().getSum('subtotal')

      await order.save()

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
        items: item => item.with('product_size.product')
      })

      return response.status(200).send(order)
    } catch (err) {
      console.log(err)

      return response.status(400).send({ message: 'Erro ao exibir pedido' })
    }
  }

  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    const { user_id, items } = request.all()

    try {
      const order = await Order.findOrFail(params.id)

      order.merge({ user_id })

      if (items) {
        await order.items().delete()
        await order.items().createMany(items, trx)
      }

      await order.save(trx)

      await trx.commit()

      return response.status(200).send(order)
    } catch (err) {
      console.log(err)
      await trx.rollback()

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
