'use strict'

const Size = use('App/Models/Size')

class SizeController {
  async index ({ response }) {
    try {
      const sizes = await Size.all()

      return response.status(200).send(sizes)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Não foi possível listar os tamanhos' })
    }
  }

  async store ({ request, response }) {
    const data = request.only(['size', 'multiplier', 'image_id', 'category_id'])

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
    const data = request.only(['size', 'multiplier', 'image_id', 'category_id'])
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

      return response.status(204).send()
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .send({ message: 'Não foi possível deletar o tamanho' })
    }
  }
}

module.exports = SizeController
