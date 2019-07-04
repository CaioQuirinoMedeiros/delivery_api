'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => ({
  name: faker.name(),
  email: faker.email({ domain: 'gmail.com' }),
  password: '123123'
}))

Factory.blueprint('App/Models/Order', faker => ({
  user_id: faker.integer({ min: 1, max: 20 }),
  observations: faker.sentence(),
  zip_code: faker.zip({ plusfour: true }),
  district: faker.city(),
  street: faker.street(),
  number: faker.integer({ min: 1, max: 250 })
}))
