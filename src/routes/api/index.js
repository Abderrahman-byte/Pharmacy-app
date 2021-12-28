const express = require('express')

const authRouter = require('./auth')
const productsRouter = require('./products')

const getApiRouter = (pool) => {
    const apiRouter = express.Router({ mergeParams: true })

    apiRouter.use('/auth', authRouter(pool))
    apiRouter.use('/products', productsRouter(pool))

    return apiRouter
}

module.exports = getApiRouter