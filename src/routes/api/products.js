const express = require('express')

const { AuthenticatedOnly, AdminOnly } = require('../../middlewares/Authentication')
const productsControllers = require('../../controllers/api/products')

const getProductsRouter = (pool) => {
    const productsRouter = express.Router({ mergeParams: true })
    const { postProduct } = productsControllers(pool)

    productsRouter.post('/', AuthenticatedOnly, AdminOnly, postProduct)

    return productsRouter
}

module.exports = getProductsRouter