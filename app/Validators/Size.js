'use strict'

class Size {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      multiplier: 'required|above:0',
      category_id: 'required|integer|exists:categories,id',
      image_id: 'integer|exists:images,id'
    }
  }

  get messages () {
    return {
      'name.required': 'Necessário fornecer um nome',
      'name.string': 'O nome deve ser um texto',
      'multiplier.required': 'Necessário fornecer o multiplicador de preço',
      'multiplier.above':
        'O multiplicador de preço deve ser um numero maior que 0',
      'category_id.required': 'Necessário fornecer uma categoria',
      'category_id.integer': 'O id da categoria deve ser um inteiro',
      'category_id.exists': 'A categoria não existe',
      'image_id.integer': 'O id da imagem deve ser um inteiro',
      'image_id.exists': 'A imagem não existe'
    }
  }
}

module.exports = Size
