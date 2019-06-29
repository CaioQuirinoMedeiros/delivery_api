'use strict'

class SessionController {
  async store ({ response, request, auth }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)

      return response.status(200).send(token)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Credenciais inválidas' })
    }
  }
}

module.exports = SessionController
