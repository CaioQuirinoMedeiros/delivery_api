'use strict'

class Product {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      base_price: 'required|above:0',
      category_id: 'required|integer|exists:categories,id',
      sizes: 'array',
      image_id: 'integer|exists:images,id'
    }
  }

  get messages () {
    return {
      'name.required': 'Necessário fornecer um nome',
      'name.string': 'O nome deve ser um texto',
      'name.unique': 'Esse produto já existe',
      'base_price.required': 'Necessário fornecer o preço base',
      'base_price.above': 'O preço base deve ser um numero maior que 0',
      'category_id.required': 'Necessário fornecer uma categoria',
      'category_id.integer': 'O id da categoria deve ser um inteiro',
      'category_id.exists': 'A categoria não existe',
      'sizes.array': 'Os tamanhos devem ser um array',
      'image_id.integer': 'O id da imagem deve ser um inteiro',
      'image_id.exists': 'A imagem não existe'
    }
  }
}

module.exports = Product
