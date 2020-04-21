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
const Size = use('App/Models/Size')

class CategoryProductSizeSeeder {
  async run () {
    const categories = await Category.createMany([
      {
        name: 'Pizzas',
        description:
          'Mais de 50 sabores de pizza em até 4 tamanhos diferentes de fome',
        cook_time: 30,
        image_id: 1
      },
      {
        name: 'Massas',
        description:
          '10 tipos de massas com diferentes molhos para te satisfazer',
        cook_time: 25,
        image_id: 2
      }
    ])

    await Size.createMany([
      { name: 'Gigante', multiplier: 1.2, category_id: 1, image_id: 3 },
      { name: 'Grande', multiplier: 1.1, category_id: 1, image_id: 4 },
      { name: 'Média', multiplier: 1, category_id: 1, image_id: 5 },
      { name: 'Pequena', multiplier: 0.9, category_id: 1, image_id: 6 },
      { name: '700g', multiplier: 1.1, category_id: 2, image_id: 4 },
      { name: '500g', multiplier: 1.0, category_id: 2, image_id: 5 },
      { name: '300g', multiplier: 0.9, category_id: 2, image_id: 6 }
    ])

    const pizzas = await categories[0].products().createMany([
      {
        name: 'Pizza Bacon',
        base_price: 25,
        image_id: 7,
        category_id: 1
      },
      {
        name: 'Pizza Frango Frito',
        base_price: 25,
        image_id: 8,
        category_id: 1
      },
      {
        name: 'Pizza Margherita',
        base_price: 27,
        image_id: 9,
        category_id: 1
      },
      {
        name: 'Pizza Napolitana',
        base_price: 28.5,
        image_id: 10,
        category_id: 1
      },
      {
        name: 'Pizza Portuguesa',
        base_price: 28.5,
        image_id: 11,
        category_id: 1
      }
    ])

    const massas = await categories[1].products().createMany([
      {
        name: 'Macarrão à Carbonara',
        base_price: 22,
        image_id: 7,
        category_id: 2
      },
      {
        name: 'Macarrão Bolonhesa',
        base_price: 25,
        image_id: 8,
        category_id: 2
      },
      {
        name: 'Macarrão Alho e Óleo',
        base_price: 24.75,
        image_id: 9,
        category_id: 2
      },
      {
        name: 'Macarrão ao Molho de Camarão',
        base_price: 27,
        image_id: 10,
        category_id: 2
      },
      {
        name: 'Macarrão ao Molho Branco',
        base_price: 28.5,
        image_id: 11,
        category_id: 2
      }
    ])

    await Promise.all(
      pizzas.map(product =>
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

    await Promise.all(
      massas.map(product =>
        product
          .sizes()
          .createMany([{ size_id: 5 }, { size_id: 6 }, { size_id: 7 }])
      )
    )
  }
}

module.exports = CategoryProductSizeSeeder
