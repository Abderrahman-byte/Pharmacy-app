const express = require('express')

const controllers = require('../../controllers/api/auth')
const { AuthenticatedOnly } = require('../../middlewares/Authentication')

const authRouter = (pool) => {
    const router = express.Router({ mergeParams : true })
    const { loginController, logoutController, registerController, getAuthUserData } = controllers(pool)

    router.post('/login', loginController)
    router.post('/logout', logoutController)
    router.get('/logout', logoutController)
    router.post('/register', registerController)
    router.get('/', AuthenticatedOnly, getAuthUserData)

    return router
}

module.exports = authRouter