'use strict'

const Size = use('App/Models/Size')

class SizeController {
  async index ({ response, request }) {
    const category = request.input('category')

    const query = Size.query().orderBy('created_at', 'desc')

    if (category) {
      query.where('category_id', category)
    }

    try {
      const sizes = await query
        .with('image')
        .with('category')
        .fetch()

      return response.status(200).send(sizes)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Não foi possível listar os tamanhos' })
    }
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'multiplier', 'image_id', 'category_id'])

    try {
      const size = await Size.create(data)

      return response.status(201).send(size)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Não foi possível criar o tamanho' })
    }
  }

  async show ({ params, response }) {
    try {
      const size = await Size.findOrFail(params.id)

      await size.loadMany(['image', 'category'])

      return response.status(200).send(size)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Não foi possível exibir o tamanho' })
    }
  }

  async update ({ params, request, response }) {
    const data = request.only(['name', 'multiplier', 'image_id', 'category_id'])
    try {
      const size = await Size.findOrFail(params.id)

      size.merge(data)

      await size.save()

      return response.status(200).send(size)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Não foi possível editar o tamanho' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const size = await Size.findOrFail(params.id)

      await size.delete()

      return response.status(200).send()
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Não foi possível deletar o tamanho' })
    }
  }
}

module.exports = SizeController
