'use strict'

const ProductSizeHook = (exports = module.exports = {})

const Product = use('App/Models/Product')
const Size = use('App/Models/Size')

ProductSizeHook.calculatePrice = async model => {
  const product = await Product.find(model.product_id)
  const size = await Size.find(model.size_id)

  model.price = product.base_price * size.multiplier
}
