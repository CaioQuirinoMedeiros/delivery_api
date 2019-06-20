'use strict'

/*
|--------------------------------------------------------------------------
| ImageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Image = use('App/Models/Image')

class ImageSeeder {
  async run () {
    await Image.createMany([
      {
        path: 'pizzas/pizzas.jpg',
        original_name: 'pizzas',
        extension: 'jpg'
      },
      {
        path: 'massas/massas.jpg',
        original_name: 'massas',
        extension: 'jpg'
      },
      {
        path: 'sizes/tamanho-gg.png',
        original_name: 'Pizza gigante',
        extension: 'png'
      },
      {
        path: 'sizes/tamanho-g.png',
        original_name: 'Pizza grande',
        extension: 'png'
      },
      {
        path: 'sizes/tamanho-m.png',
        original_name: 'Pizza média',
        extension: 'png'
      },
      {
        path: 'sizes/tamanho-p.png',
        original_name: 'Pizza pequena',
        extension: 'png'
      },
      {
        path: 'pizzas/bacon.png',
        original_name: 'Pizza bacon',
        extension: 'png'
      },
      {
        path: 'pizzas/frango_frito.png',
        original_name: 'Pizza frango_frito',
        extension: 'png'
      },
      {
        path: 'pizzas/margherita.png',
        original_name: 'Pizza margherita',
        extension: 'png'
      },
      {
        path: 'pizzas/mussarela.png',
        original_name: 'Pizza mussarela',
        extension: 'png'
      },
      {
        path: 'pizzas/napolitana.png',
        original_name: 'Pizza napolitana',
        extension: 'png'
      },
      {
        path: 'pizzas/portuguesa.png',
        original_name: 'Pizza portuguesa',
        extension: 'png'
      }
    ])
  }
}

module.exports = ImageSeeder
