/* eslint-disable camelcase */
'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ request, response }) {
    const categoryId = request.input('category')

    const query = Product.query()

    if (categoryId) {
      query.where('category_id', categoryId)
    }

    try {
      const products = await query.with('image').fetch()

      return response.status(200).send(products)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar produtos' })
    }
  }

  async show ({ params, response }) {
    try {
      const product = await Product.findOrFail(params.id)

      await product.loadMany({
        image: null,
        category: null,
        sizes: size => size.with('size')
      })

      return response.status(200).send(product)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao exibir produto' })
    }
  }
}

module.exports = ProductController
