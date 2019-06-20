/* eslint-disable camelcase */
'use strict'

const OrderItemHook = (exports = module.exports = {})

const ProductSize = use('App/Models/ProductSize')

OrderItemHook.updateSubtotal = async model => {
  const product_size = await ProductSize.find(model.product_size_id)

  model.subtotal = product_size.price * model.quantity
}

OrderItemHook.attachProductSize = async model => {
  const product_size = await ProductSize.find(model.product_size_id)

  await product_size.items().attach([model.id])
}
