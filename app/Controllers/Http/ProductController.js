'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ request, response, view }) {
    const products = await Product.all()

    return products
  }

  async store ({ request }) {
    const { name } = request.all()

    const product = await Product.create({ name })

    return product
  }

  async show ({ params }) {
    const product = await Product.find(params.id)

    return product
  }

  async update ({ params, request }) {
    const { name } = request.all()
    const product = await Product.find(params.id)

    product.merge({ name })

    await product.save()

    return product
  }

  async destroy ({ params }) {
    const product = await Product.find(params.id)

    await product.delete()
  }
}

module.exports = ProductController
