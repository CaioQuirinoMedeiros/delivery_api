/* eslint-disable camelcase */
'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request, response }) {
    const name = request.input('name')

    const query = Category.query().orderBy('created_at', 'desc')

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

  async store ({ request, response }) {
    const { name, description, cook_time, image_id } = request.all()

    try {
      const category = await Category.create({
        name,
        description,
        cook_time,
        image_id
      })

      return response.status(201).send(category)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao criar categoria' })
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

  async update ({ params, request, response }) {
    const data = request.only(['name', 'description', 'cook_time', 'image_id'])

    try {
      const category = await Category.findOrFail(params.id)

      category.merge(data)

      await category.save()

      return response.status(200).send(category)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao editar categoria' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const category = await Category.findOrFail(params.id)

      await category.delete()

      return response.status(200).send()
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao deletar categoria' })
    }
  }
}

module.exports = CategoryController
