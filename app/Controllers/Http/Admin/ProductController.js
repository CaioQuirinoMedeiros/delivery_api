/* eslint-disable camelcase */
'use strict'

const Product = use('App/Models/Product')
const Category = use('App/Models/Category')
const ProductSize = use('App/Models/ProductSize')

const Database = use('Database')

class ProductController {
  async index ({ request, response }) {
    const categoryId = request.input('category')

    const query = Product.query()

    if (categoryId) {
      query.where('category_id', categoryId)
    }

    try {
      const products = await query
        .with('image')
        .with('category')
        .with('sizes.size')
        .fetch()

      return response.status(200).send(products)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar produtos' })
    }
  }

  async store ({ request, response }) {
    const trx = await Database.beginTransaction()
    const { name, base_price, image_id, category_id, sizes } = request.all()

    try {
      const category = await Category.findOrFail(category_id)

      const product = await category
        .products()
        .create({ name, base_price, image_id, category_id }, trx)

      if (sizes) {
        await product.sizes().createMany(sizes, trx)
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
        category: null,
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
    const { name, base_price, image_id, category_id, sizes } = request.all()

    try {
      const product = await Product.findOrFail(params.id)

      if (category_id) {
        const oldCategory = await Category.findOrFail(product.category_id)
        const category = await Category.findOrFail(category_id)

        await oldCategory.products().detach([product.id], trx)

        await category.products().attach([product.id], trx)
      }

      product.merge({ name, base_price, image_id, category_id })

      await product.save(trx)

      if (sizes) {
        await product
          .sizes()
          .whereNotIn('size_id', sizes.map(size => size.size_id))
          .delete(trx)

        const productSizes = await ProductSize.query()
          .where({ product_id: product.id })
          .pluck('size_id')

        const newSizes = sizes.filter(
          size => !productSizes.includes(Number(size.size_id))
        )

        await product.sizes().createMany(newSizes, trx)
      }

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

      return response.status(200).send()
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao deletar produto' })
    }
  }
}

module.exports = ProductController
