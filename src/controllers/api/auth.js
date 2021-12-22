const bcrypt = require('bcrypt')

const { validateEmail, validatePassword } = require("../../utils/validators")
const getAccountModels = require('../../models/account')

const getLoginController = (pool) => {
    const { getAccountByUserOrEmail } = getAccountModels(pool)

    return async (request, response) => {
        const { username, password } = request.body
        const errors = []

        if (!username || username.length <= 3) errors.push('Username field is required')
        if (!password || password.length <= 0) errors.push('Password field is required')

        if (errors.length > 0) return response.json({ ok: false, errors})

        try {
            const data = await getAccountByUserOrEmail(username)

            if (!data || !bcrypt.compareSync(password, data?.password))
                return response.status(400).json({ ok:false, errors: ['Wrong credentials']})

            delete data.password
            delete data.updated_date
            delete data.last_login

            request.session.user_id = data.id

            response.json(data)
        } catch (err) {
            console.error(err)
            response.json({ ok: false, errors: ['Something went wrong'] })
        }
    }
}

const getRegisterController = (pool) => {
    const { createAccount } = getAccountModels(pool)

    return async (request, response) => {
        const { body } = request
        const { username, email, firstname, lastname, password, password2 } = body
        const errors = []

        if (!username || username.length <= 3) errors.push('Username field is required')

        if (!email || email.length <= 0) errors.push('Email field is required')
        else if (!validateEmail(email)) errors.push('Invalid email address')

        if (!firstname || firstname.length <= 3) errors.push('First name field is required')
        if (!lastname || lastname.length <= 3) errors.push('Last name field is required')
        
        if (!password || password.length <= 0) errors.push('Password field is required')
        else if(!validatePassword(password)) errors.push('Password must contain minimum eight characters, at least one letter and one number')

        if (!password2 || password2.length <= 0) errors.push('Password Confirmation field is required')
        else if (password !== password2) errors.push('Passwords doesn\' match')

        if (errors.length > 0) return response.json({ ok: false, errors})

        try {
            const { id } = await createAccount(body)
            request.session.user_id = data.id
            
            response.json({ ok : true , data: { id }})
        } catch (err) {
            const { constraint } = err
            const errors = []

            if (constraint === 'account_username_key') {
                errors.push('Account with the same username already exists')
            } else if (constraint === '') {
                errors.push('Account with the same email already exists')
            } else {
                errors.push('Something went wrong')
            }

            response.status(400).json({ ok: false, errors})
        }
    }
}

const getLogoutController = (pool) => {
    return (request, response) => {
        request?.session?.destroy()
        response.json({ ok: true })
    }
}

module.exports = (pool) => {
    return {
        loginController: getLoginController(pool),
        registerController: getRegisterController(pool),
        logoutController: getLogoutController(pool),
    }
}
