const validateEmail = (email) => {
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
}
const validatePassword = (password) => {
    return /(?=.*[A-Za-z].*)(?=.*\d.*)(?=.{8,})/.test(password)
}

const isNone = (value) => value === '' || value === null || value === undefined

const isNumber = (value) => !isNone(value) && !isNaN(Number(value))

module.exports = {
    validateEmail,
    validatePassword,
    isNone,
    isNumber
}