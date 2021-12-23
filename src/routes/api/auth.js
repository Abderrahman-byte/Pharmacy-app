const express = require('express')

const controllers = require('../../controllers/api/auth')

const authRouter = (pool) => {
    const router = express.Router({ mergeParams : true })
    const { loginController, logoutController, registerController } = controllers(pool)

    router.post('/login', loginController)
    router.post('/logout', logoutController)
    router.get('/logout', logoutController)
    router.post('/register', registerController)

    return router
}

module.exports = authRouter