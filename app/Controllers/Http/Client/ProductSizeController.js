'use strict'

const ProductSize = use('App/Models/ProductSize')

class ProductSizeController {
  async index ({ request, response }) {
    const productId = request.input('product')

    try {
      const productSizes = await ProductSize.query()
        .where('product_id', productId)
        .with('size.image')
        .fetch()

      return response.status(200).send(productSizes)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Erro ao listar tamanhos do produto' })
    }
  }

  async show ({ params, response }) {
    try {
      const productSize = await ProductSize.findOrFail(params.id)

      await productSize.loadMany({
        product: product => product.with('image'),
        size: null
      })

      return response.status(200).send(productSize)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Erro ao exibir tamanho do produto' })
    }
  }
}

module.exports = ProductSizeController
