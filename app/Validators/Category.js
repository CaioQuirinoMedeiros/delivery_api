'use strict'

class Category {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      description: 'required|string',
      cook_time: 'required|integer',
      image_id: 'integer|exists:images,id'
    }
  }

  get messages () {
    return {
      'name.required': 'Necessário fornecer um nome',
      'name.string': 'O nome deve ser um texto',
      'description.required': 'Necessário fornecer uma descrição',
      'description.string': 'A descrição deve ser um texto',
      'cook_time.required': 'Necessário fornecer o tempo de cozimento',
      'cook_time.integer': 'O tempo de cozimento deve ser um inteiro',
      'image_id.integer': 'O id da imagem deve ser um inteiro',
      'image_id.exists': 'A imagem não existe'
    }
  }
}

module.exports = Category
