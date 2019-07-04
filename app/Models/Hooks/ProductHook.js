'use strict'

const ProductHook = (exports = module.exports = {})

const ProductSize = use('App/Models/ProductSize')
const Size = use('App/Models/Size')

ProductHook.updateSizes = async model => {
  const sizesId = await ProductSize.query()
    .where('product_id', model.id)
    .pluck('size_id')

  await Promise.all(
    sizesId.map(async sizeId => {
      const size = await Size.find(sizeId)

      await ProductSize.query()
        .where({ product_id: model.id, size_id: sizeId })
        .update({ price: model.base_price * size.multiplier })
    })
  )
}
