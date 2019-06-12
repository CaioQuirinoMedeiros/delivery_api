'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { bem_vindo: 'api de delivery por Caio Quirino' }
})

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.resource('products', 'ProductController')
  .apiOnly()
  .middleware('auth')
