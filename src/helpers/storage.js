const { default:axios } = require('axios')
const fs = require('fs')
const FormData = require('form-data')

require('dotenv').config()

const { basicAuth, SHA1 } = require('../utils/generic')

const cloudname = process.env.CLOUDINARY_CLOUDNAME
const apiKey = process.env.CLOUDINARY_APIKEY
const secret = process.env.CLOUDINARY_SECRETKEY

const uploadFile = async (path) => {
    const formData = new FormData()
    const ts = Math.floor(Date.now() / 1000)
    const data = { timestamp: ts }
    const queryString = Object.keys(data).sort().map(key => {
        return encodeURIComponent(key) + '=' + data[key]
    }).join('&')

    formData.append('file', fs.createReadStream(path))
    formData.append('timestamp', ts)
    formData.append('api_key', apiKey)
    formData.append('signature', SHA1(queryString + secret))

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,formData, {
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${basicAuth(apiKey, secret)}`,
            ...formData.getHeaders()
        },
    })

    return response.data
}

const destroyFile = async (id) => {
    const formData = new FormData()

    const ts = Math.floor(Date.now() / 1000)
    const data = { timestamp: ts, public_id: id }
    const queryString = Object.keys(data).sort().map(key => {
        return encodeURIComponent(key) + '=' + data[key]
    }).join('&')

    formData.append('public_id', id)
    formData.append('timestamp', ts)
    formData.append('api_key', apiKey)
    formData.append('signature', SHA1(queryString + secret))

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/image/destroy`,formData, {
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${basicAuth(apiKey, secret)}`,
            ...formData.getHeaders()
        },
    })

    return response.data
}

module.exports = {
    uploadFile,
    destroyFile
}