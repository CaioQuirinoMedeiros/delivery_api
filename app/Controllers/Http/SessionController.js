'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ response, request, auth }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)

      const user = await User.findBy('email', email)

      const roles = await user.getRoles()

      return response.status(200).send({ ...token, roles })
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Credenciais inválidas' })
    }
  }
}

module.exports = SessionController
