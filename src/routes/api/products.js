const express = require('express')
const formidableMiddleware = require('express-formidable-v2')

const { AuthenticatedOnly, AdminOnly } = require('../../middlewares/Authentication')
const productsControllers = require('../../controllers/api/products')

const getProductsRouter = (pool) => {
    const productsRouter = express.Router({ mergeParams: true })
    const { postProduct, deleteProduct, getProducts, updateProduct, postProductImage } = productsControllers(pool)

    productsRouter.post('/', AuthenticatedOnly, AdminOnly, postProduct)
    productsRouter.delete('/:id', AuthenticatedOnly, AdminOnly, deleteProduct)
    productsRouter.get('/', getProducts)
    productsRouter.put('/:id', AuthenticatedOnly, AdminOnly, updateProduct)
    productsRouter.post('/:id/images', AuthenticatedOnly, AdminOnly, formidableMiddleware({
        multiples: true
    }), postProductImage)

    return productsRouter
}

module.exports = getProductsRouter