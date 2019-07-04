'use strict'

const ProductHook = (exports = module.exports = {})

const ProductSize = use('App/Models/ProductSize')
const Product = use('App/Models/Product')

ProductHook.updateProductSizesPrice = async model => {
  const productsId = await ProductSize.query()
    .where('size_id', model.id)
    .pluck('product_id')

  await Promise.all(
    productsId.map(async productId => {
      const product = await Product.find(productId)

      await ProductSize.query()
        .where({ size_id: model.id, product_id: productId })
        .update({ price: product.base_price * model.multiplier })
    })
  )
}
