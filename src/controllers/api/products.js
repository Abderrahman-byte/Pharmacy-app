const productModels = require('../../models/product')
const { isNumber, isNone } = require('../../utils/validators')

const postProductController = (pool) => {
    const { createProduct } = productModels(pool)

    return async (request, response) => {
        const { title, price, description, quantity } = request.body
        const errors = []

        if (isNone(title) || title.length <= 3) errors.push('Title field is required')
        
        if (isNone(price)) errors.push('Price field is required')
        else if (!isNumber(price) || price <= 0) errors.push('Invalid price value')

        if (isNone(quantity)) errors.push('Quantity field is required')
        else if (!isNumber(quantity) || quantity < 0) errors.push('Invalid quantity value')

        if (errors.length > 0) return response.json({ ok: false, errors })

        try {
            const { id } = await createProduct(request.body)
            response.json({ ok: true, data: { id }})
        } catch (err) {
            console.log('[ERROR] ' + err)
            response.json({ ok:false, errors: ['Something went wrong, please try later']})
        }

    }
}

module.exports = (pool) => {
    return {
        postProduct : postProductController(pool)
    }
}