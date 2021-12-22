const express = require('express')

const authRouter = require('../../routes/api/auth')

const getApiRouter = (pool) => {
    const apiRouter = express.Router({ mergeParams: true })

    apiRouter.use('/auth', authRouter(pool))

    return apiRouter
}

module.exports = getApiRouter