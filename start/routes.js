'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.resource('categories', 'CategoryController').apiOnly()

  Route.resource('products', 'ProductController').apiOnly()

  Route.resource('sizes', 'SizeController').apiOnly()

  Route.resource('images', 'ImageController').apiOnly()
}).middleware('auth')
