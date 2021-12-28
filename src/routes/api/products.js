const express = require('express')

const { AuthenticatedOnly, AdminOnly } = require('../../middlewares/Authentication')
const productsControllers = require('../../controllers/api/products')

const getProductsRouter = (pool) => {
    const productsRouter = express.Router({ mergeParams: true })
    const { postProduct, deleteProduct, getProducts } = productsControllers(pool)

    productsRouter.post('/', AuthenticatedOnly, AdminOnly, postProduct)
    productsRouter.delete('/:id', AuthenticatedOnly, AdminOnly, deleteProduct)
    productsRouter.get('/', getProducts)

    return productsRouter
}

module.exports = getProductsRouter