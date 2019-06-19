/* eslint-disable camelcase */
'use strict'

const Product = use('App/Models/Product')

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
    const { name, base_price, image_id, categories } = request.all()

    try {
      const product = await Product.create({ name, base_price, image_id })

      await product.categories().attach([...categories])

      return response.status(201).send(product)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao criar produto' })
    }
  }

  async show ({ params, request, response }) {
    try {
      const product = await Product.findOrFail(params.id)

      await product.loadMany(['image', 'categories'])

      return response.status(200).send(product)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao exibir produto' })
    }
  }

  async update ({ params, request, response }) {
    const { name, base_price, image_id, categories } = request.all()

    try {
      const product = await Product.findOrFail(params.id)

      product.merge({ name, base_price, image_id })

      if (categories) {
        await product.categories().detach()

        await product.categories().attach([...categories])
      }

      await product.save()

      return response.status(200).send(product)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao editar produto' })
    }
  }

  async destroy ({ params, request, response }) {
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
