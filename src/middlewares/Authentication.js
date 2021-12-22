const getAccountModels = require('../models/account')

const Authentication = (pool) => {
    const { getAccountById } = getAccountModels(pool)

    return async (request, response, next) => {
        const userId = request.session?.user_id
        
        request.authenticated = false
        
        if (!userId) return next()

        const user = await getAccountById(userId)

        if (!user) return next()

        request.user = user
        request.authenticated = true

        next()
    }
}

const AuthenticatedOnly = (request, response, next) => {
    if (request.authenticated && request.user) return next()

    response.status(401).json({ ok: true, errors: ['Authentication is required']})
}

module.exports = {
    Authentication,
    AuthenticatedOnly
}