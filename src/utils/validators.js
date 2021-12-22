const validateEmail = (email) => {
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
}
const validatePassword = (password) => {
    return /(?=.*[A-Za-z].*)(?=.*\d.*)(?=.{8,})/.test(password)
}

module.exports = {
    validateEmail,
    validatePassword
}