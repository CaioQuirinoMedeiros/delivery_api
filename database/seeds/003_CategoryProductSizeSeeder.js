'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')
const Size = use('App/Models/Size')

class CategoryProductSizeSeeder {
  async run () {
    await Category.createMany([
      {
        name: 'Pizzas',
        description: 'Pizzas gostosas prontas para comer',
        cook_time: 25,
        image_id: 1
      },
      {
        name: 'Massas',
        description: 'Massas gostosas prontas para comer',
        cook_time: 15,
        image_id: 2
      }
    ])

    await Size.createMany([
      { size: 'Gigante', multiplier: 1.2, category_id: 1, image_id: 3 },
      { size: 'Grande', multiplier: 1.1, category_id: 1, image_id: 4 },
      { size: 'Média', multiplier: 1, category_id: 1, image_id: 5 },
      { size: 'Pequena', multiplier: 0.9, category_id: 1, image_id: 6 }
    ])

    const products = await Product.createMany([
      {
        name: 'Pizza Bacon',
        base_price: 25,
        image_id: 7
      },
      {
        name: 'Pizza Frango Frito',
        base_price: 25,
        image_id: 8
      },
      {
        name: 'Pizza Margherita',
        base_price: 27,
        image_id: 9
      },
      {
        name: 'Pizza Mussarela',
        base_price: 27,
        image_id: 10
      },
      {
        name: 'Pizza Napolitana',
        base_price: 28.5,
        image_id: 11
      },
      {
        name: 'Pizza Portuguesa',
        base_price: 28.5,
        image_id: 12
      }
    ])

    await Promise.all(products.map(product => product.categories().attach([1])))
    await Promise.all(
      products.map(product =>
        product
          .sizes()
          .createMany([
            { size_id: 1 },
            { size_id: 2 },
            { size_id: 3 },
            { size_id: 4 }
          ])
      )
    )
  }
}

module.exports = CategoryProductSizeSeeder
