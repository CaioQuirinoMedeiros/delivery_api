/* eslint-disable camelcase */
'use strict'

const Product = use('App/Models/Product')

const Database = use('Database')

class ProductController {
  async index ({ request, response, pagination }) {
    const { page, limit } = pagination
    const categoryId = request.input('category')

    const query = Product.query()

    if (categoryId) {
      query.where('category_id', categoryId)
    }

    try {
      const products = await query.with('image').paginate(page, limit)

      return response.status(200).send(products)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar produtos' })
    }
  }

  async store ({ request, response }) {
    const trx = await Database.beginTransaction()
    const { name, base_price, image_id, categories, sizes } = request.all()

    try {
      const product = await Product.create({ name, base_price, image_id }, trx)

      if (categories) {
        await product.categories().attach([...categories], trx)
      }

      if (sizes) {
        product.sizes().createMany(sizes, trx)
      }

      await trx.commit()

      return response.status(201).send(product)
    } catch (err) {
      console.log(err)
      await trx.rollback()
      return response.status(400).send({ message: 'Erro ao criar produto' })
    }
  }

  async show ({ params, response }) {
    try {
      const product = await Product.findOrFail(params.id)

      await product.loadMany({
        image: null,
        categories: null,
        sizes: size => size.with('size')
      })

      return response.status(200).send(product)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao exibir produto' })
    }
  }

  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    const { name, base_price, image_id, categories, sizes } = request.all()

    try {
      const product = await Product.findOrFail(params.id)

      product.merge({ name, base_price, image_id })

      if (categories) {
        await product.categories().sync([...categories], trx)
      }

      if (sizes) {
        await product.sizes().delete(trx)
        await product.sizes().createMany(sizes, trx)
      }

      await product.save(trx)

      await trx.commit()

      return response.status(200).send(product)
    } catch (err) {
      console.log(err)
      await trx.rollback()
      return response.status(400).send({ message: 'Erro ao editar produto' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const product = await Product.findOrFail(params.id)

      await product.delete()

      return response.status(204).send()
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao deletar produto' })
    }
  }
}

module.exports = ProductController
