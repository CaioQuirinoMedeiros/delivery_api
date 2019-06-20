'use strict'

const OrderHook = (exports = module.exports = {})

OrderHook.updateTotal = async model => {
  model.total = await model.items().getSum('subtotal')

  model.save()
}
