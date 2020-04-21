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
const User = use('App/Models/User')
const Role = use('Role')

class UserSeeder {
  async run () {
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@delivery.com',
      password: '123456'
    })

    const adminRole = await Role.findBy('slug', 'admin')

    await admin.roles().attach([adminRole.id])
  }
}

module.exports = UserSeeder
