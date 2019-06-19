'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request, auth }) {
    const data = await request.only(['name', 'email', 'password'])

    await User.create(data)

    const token = await auth.attempt(data.email, data.password)

    return token
  }
}

module.exports = UserController
