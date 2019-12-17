'use strict'

const User = use('App/Models/User')
const Role = use('Role')

class UserController {
  async store ({ response, request, auth }) {
    const data = await request.only(['name', 'email', 'password'])

    try {
      const clientRole = await Role.findBy('slug', 'client')

      if (!clientRole) {
        console.error('Role client não encontrada')
        return response.status(404).send({ error: 'Role client não encontrada'})
      }

      const user = await User.create(data)

      await user.roles().attach([clientRole.id])

      const token = await auth.attempt(data.email, data.password)

      return response.status(201).send(token)
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Erro ao criar usuário' })
    }
  }
}

module.exports = UserController
