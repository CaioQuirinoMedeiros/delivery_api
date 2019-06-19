'use strict'

const OrderHook = (exports = module.exports = {})

OrderHook.updateTotal = async model => {
  model.items().getSum('subtotal')
}
