'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle (ctx, next) {
    ctx.pagination = {
      page: parseInt(ctx.request.input('page')) || 1,
      limit: parseInt(ctx.request.input('limit') || 20)
    }
    await next()
  }
}

module.exports = Pagination
