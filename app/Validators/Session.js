'use strict'

class Session {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'email|required',
      password: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'Preencha seu email',
      'email.email': 'O email não é válido',
      'password.required': 'Preencha sua senha'
    }
  }
}

module.exports = Session
