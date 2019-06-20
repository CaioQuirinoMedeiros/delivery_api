'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.resource('categories', 'CategoryController')
    .apiOnly()
    .validator(
      new Map([[['categories.store', 'categories.update'], ['Category']]])
    )

  Route.resource('products', 'ProductController')
    .apiOnly()
    .validator(new Map([[['products.store', 'products.update'], ['Product']]]))

  Route.resource('sizes', 'SizeController')
    .apiOnly()
    .validator(new Map([[['sizes.store', 'sizes.update'], ['Size']]]))

  Route.resource('orders', 'OrderController')
    .apiOnly()
    .validator(new Map([[['orders.store', 'orders.update'], ['Order']]]))

  Route.resource('images', 'ImageController').apiOnly()
}).middleware('auth')
