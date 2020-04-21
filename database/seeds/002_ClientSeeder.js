'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')
const Role = use('Role')

class UserSeeder {
  async run () {
    const clients = await Factory.model('App/Models/User').createMany(20)

    const clientRole = await Role.findBy('slug', 'client')

    Promise.all(clients.map(client => client.roles().attach([clientRole.id])))

    const client = await User.create({
      name: 'Cliente',
      email: 'cliente@delivery.com',
      password: '123456'
    })

    await client.roles().attach([clientRole.id])
  }
}

module.exports = UserSeeder
