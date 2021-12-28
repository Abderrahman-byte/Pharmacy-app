const express = require('express')

const { AuthenticatedOnly, AdminOnly } = require('../../middlewares/Authentication')
const productsControllers = require('../../controllers/api/products')

const getProductsRouter = (pool) => {
    const productsRouter = express.Router({ mergeParams: true })
    const { postProduct, deleteProduct } = productsControllers(pool)

    productsRouter.post('/', AuthenticatedOnly, AdminOnly, postProduct)
    productsRouter.delete('/:id', AuthenticatedOnly, AdminOnly, deleteProduct)

    return productsRouter
}

module.exports = getProductsRouter