'use strict'

const OrderItemHook = (exports = module.exports = {})

const ProductSize = use('App/Models/ProductSize')

OrderItemHook.updateSubtotal = async model => {
  const productSize = await ProductSize.find(model.product_id)

  model.subtotal = productSize.price * model.quantity
}
