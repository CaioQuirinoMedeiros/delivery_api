/* eslint-disable camelcase */
'use strict'

const Image = use('App/Models/Image')

const Helpers = use('Helpers')
const fs = use('fs')
const { promisify } = use('util')

const unlink = promisify(fs.unlink)

class ImageController {
  async index ({ response }) {
    try {
      const images = await Image.query()
        .orderBy('id', 'DESC')
        .fetch()

      return response.status(200).send(images)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao listar imagens' })
    }
  }

  async store ({ request, response }) {
    const file = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    if (!file) {
      return response.status(400).send({ message: 'Nenhuma imagem recebida' })
    }

    try {
      await file.move(Helpers.publicPath('uploads'), {
        name: `${Date.now()}-${file.clientName.split(' ').join('_')}`
      })

      if (!file.moved()) {
        console.error(file)
        return response.status(400).send({ message: 'Erro ao salvar imagem' })
      }

      const image = await Image.create({
        path: file.fileName,
        size: file.size,
        original_name: file.clientName,
        extension: file.subtype
      })

      return response.status(201).send(image)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao processar imagem' })
    }
  }

  async show ({ params, response }) {
    try {
      const image = await Image.findOrFail(params.id)

      return response.status(200).send(image)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao exibir imagem' })
    }
  }

  async update ({ params, request, response }) {
    const original_name = request.input('original_name')

    try {
      const image = await Image.findOrFail(params.id)

      image.merge({ original_name })

      await image.save()

      return response.status(200).send(image)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao editar imagem' })
    }
  }

  async destroy ({ params, response }) {
    try {
      const image = await Image.findOrFail(params.id)

      const filePath = Helpers.publicPath(`uploads/${image.path}`)

      if (fs.existsSync(filePath)) {
        await unlink(filePath)
      }

      await image.delete()

      return response.status(200).send()
    } catch (err) {
      console.error(err)
      return response.status(400).send({ message: 'Erro ao deletar imagem' })
    }
  }
}

module.exports = ImageController
