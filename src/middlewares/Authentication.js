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

module.exports = {
    Authentication
}