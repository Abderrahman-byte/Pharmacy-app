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

const deleteProductController = (pool) => {
    const { deleteProduct } = productModels(pool)
    
    return async (request, response) => {
        const { id } = request.params
        
        try {
            const deleted = await deleteProduct(id)
            
            if (deleted) response.json({ ok: true })
            else response.json({ ok:false, errors: ['Product not found']})
        } catch (err) {
            console.log('[ERROR] ' + err)
            response.json({ ok:false, errors: ['Something went wrong, please try later']})
        }
    }
}

const getProductsController = (pool) => {
    const itemsPerPage = 10
    const { getProductsList } = productModels(pool)
    
    return async (request, response) => {
        let { page } = request.query
        page = !isNone(page) && isNumber(page) && page > 0 ? page : 1
        
        const offset = (page - 1) * itemsPerPage
        
        try {
            const data = await getProductsList(itemsPerPage, offset)
            response.json({ ok: true, itemsPerPage, data})
        } catch (err) {
            console.log('[ERROR] ' + err)
            response.json({ ok:false, errors: ['Something went wrong, please try later']})
        }
    }
}

const updateProductController = (pool) => {
    const { updateProduct } = productModels(pool)

    return async (request, response) => {
        const { body } = request
        const { id } = request.params
        const errors = []
        
        if ('title' in body && body.title.length <= 3) errors.push('Title field is invalid')
        if ('price' in body && !isNumber(body.price)) errors.push('Price field is invalid')
        if ('description' in body && body.description.length <= 10) errors.push('Description field is invalid')
        if ('quantity' in body && !isNumber(body.quantity)) errors.push('Quantity field is invalid')

        if (!['title', 'price', 'description', 'quantity'].some(f => f in body))
            errors.push('You have sent at least one of these fields : title, price, description, quantity')

        if (errors.length > 0) return response.json({ ok: false, errors})

        try {
            const updated = await updateProduct(id, body)
            
            response.json({ ok: updated })
        } catch (err) {
            console.log('[ERROR] ' + err)
            response.json({ ok: false })
        }
    }
}

module.exports = (pool) => {
    return {
        postProduct : postProductController(pool),
        deleteProduct: deleteProductController(pool),
        getProducts : getProductsController(pool),
        updateProduct: updateProductController(pool)
    }
}