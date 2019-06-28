/* eslint-disable camelcase */
'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request, response }) {
    const name = request.input('name')

    const query = Category.query()

    if (name) {
      query.where('name', 'iLIKE', `%${name}%`)
    }

    try {
      const categories = await query.with('image').fetch()

      return response.status(200).send(categories)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar categorias' })
    }
  }

  async show ({ params, response }) {
    try {
      const category = await Category.findOrFail(params.id)

      await category.loadMany(['products', 'image'])

      return response.status(200).send(category)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao exibir categoria' })
    }
  }
}

module.exports = CategoryController
