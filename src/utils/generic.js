const crypto = require('crypto')

const base64Encoding = (data) => Buffer.from(data).toString('base64')

const basicAuth = (username, password) => base64Encoding(`${username}:${password}`)

const SHA1 = (data) => {
    const hash = crypto.createHash('sha1')
    hash.update(data)
    return hash.digest().toString('hex')
}

module.exports = {
    base64Encoding,
    basicAuth,
    SHA1
}