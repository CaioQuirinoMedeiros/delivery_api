'use strict'

class Order {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      user_id: 'required|integer|exists:users,id',
      observations: 'string',
      zip_code: 'required|string',
      district: 'required|string',
      street: 'required|string',
      number: 'integer',
      status: 'string',
      items: 'required:array'
    }
  }

  get messages () {
    return {
      'user_id.required': 'Necessário fornecer o id do usuário',
      'user_id.integer': 'O id do usuário deve ser um inteiro',
      'user_id.exists': 'O usuário não existe',
      'observations.string': 'As observações devem ser um texto',
      'zip_code.required': 'Necessário fornecer o CEP',
      'zip_code.string': 'O CEP deve ser um texto',
      'district.required': 'Necessário fornecer o bairro',
      'district.string': 'O bairro deve ser um texto',
      'street.required': 'Necessário fornecer a rua',
      'street.string': 'A rua deve ser um texto',
      'number.integer': 'O número deve ser um inteiro',
      'status.string': 'O status deve ser um texto',
      'items.required': 'Necessário adicionar items ao pedido',
      'items.array': 'Os items devem ser um array'
    }
  }
}

module.exports = Order
