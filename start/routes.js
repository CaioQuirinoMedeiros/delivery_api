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
    .validator(new Map([[['orders.store'], ['Order']]]))

  Route.resource('images', 'ImageController').apiOnly()
})
  .prefix('admin')
  .namespace('Admin')
  .middleware(['auth', 'is:admin'])

Route.group(() => {
  Route.resource('categories', 'CategoryController').only(['index', 'show'])

  Route.resource('products', 'ProductController').only(['index', 'show'])

  Route.resource('sizes', 'ProductSizeController').only(['index', 'show'])

  Route.resource('orders', 'OrderController').only(['index', 'show', 'store'])
})
  .namespace('Client')
  .middleware(['auth', 'is:client'])
