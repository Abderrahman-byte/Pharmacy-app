const getLoginController = (pool) => {
    return (request, response) => {
        response.json({ message: 'this the login controller'})
    }
}

const getRegisterController = (pool) => {
    return (request, response) => {}
}

const getLogoutController = (pool) => {
    return (request, response) => {}
}

module.exports = (pool) => {
    return {
        loginController: getLoginController(pool),
        registerController: getRegisterController(pool),
        logoutController: getLogoutController(pool),
    }
}
