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
        path: 'pizzas.jpg',
        original_name: 'pizzas',
        extension: 'jpg'
      },
      {
        path: 'massas.jpg',
        original_name: 'massas',
        extension: 'jpg'
      },
      {
        path: 'tamanho-gg.png',
        original_name: 'Pizza gigante',
        extension: 'png'
      },
      {
        path: 'tamanho-g.png',
        original_name: 'Pizza grande',
        extension: 'png'
      },
      {
        path: 'tamanho-m.png',
        original_name: 'Pizza média',
        extension: 'png'
      },
      {
        path: 'tamanho-p.png',
        original_name: 'Pizza pequena',
        extension: 'png'
      },
      {
        path: 'bacon.png',
        original_name: 'Pizza bacon',
        extension: 'png'
      },
      {
        path: 'frango_frito.png',
        original_name: 'Pizza frango_frito',
        extension: 'png'
      },
      {
        path: 'margherita.png',
        original_name: 'Pizza margherita',
        extension: 'png'
      },
      {
        path: 'napolitana.png',
        original_name: 'Pizza napolitana',
        extension: 'png'
      },
      {
        path: 'portuguesa.png',
        original_name: 'Pizza portuguesa',
        extension: 'png'
      },
      {
        path: 'no-image.jpg',
        original_name: 'Sem imagem',
        extension: 'jpg'
      }
    ])
  }
}

module.exports = ImageSeeder
