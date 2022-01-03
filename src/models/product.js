const createProduct = (pool) => {
    return async ({ title, price, quantity, description}) => {
        const createInventoryResponse = await pool.query('INSERT INTO product_inventory (quantity) VALUES ($1) RETURNING id', [quantity])

        if (createInventoryResponse?.rows?.length <= 0) return null

        const inventoryId = createInventoryResponse?.rows[0]?.id

        try {
            const createProductResponse = await pool.query('INSERT INTO product (title, price, description, inventory_id) VALUES ($1, $2, $3, $4) RETURNING id', [title, price, description || '', inventoryId])

            if (createProductResponse?.rows?.length <= 0) {
                await pool.query('DELETE FROM product_inventory WHERE id = $1', [inventoryId])
                return null
            }

            return createProductResponse.rows[0]
        } catch (err) {
            await pool.query('DELETE FROM product_inventory WHERE id = $1', [inventoryId])
            throw err
        }

    }
}

const deleteProduct = (pool) => {
    return async (id) => {
        const deleteProductResponse = await pool.query('DELETE FROM product WHERE id = $1 RETURNING inventory_id', [id])
        
        if (deleteProductResponse?.rows?.length <= 0) return false

        const inventoryId = deleteProductResponse.rows[0].inventory_id

        const deleteInventoryResponse = await pool.query('DELETE FROM product_inventory WHERE id = $1', [inventoryId])

        return deleteInventoryResponse.rowCount > 0
    }
}

// TODO : MUST add images
const getProductsList = (pool) => {
    return async (limit = 10, offset = 0) => {
        const response = await pool.query(`SELECT p.id, p.title, p.price, p.created_date, i.quantity
        FROM product AS p JOIN product_inventory AS i ON p.inventory_id = i.id 
        ORDER BY created_date DESC LIMIT $1 OFFSET $2`, [limit, offset])
        return response.rows || []
    }
}

const updateProduct = (pool) => {
    const allowedFields = ['title', 'description', 'quantity', 'price']
    const productAllowedFields = ['title', 'description', 'price']
    const invenoryAllowedFields = ['quantity']

    return async (id, data) => {
        const filteredData = Object.entries(data).filter(entry => allowedFields.includes(entry[0]))
        const productData = Object.entries(data).filter(entry => productAllowedFields.includes(entry[0]))
        const inventoryData = Object.entries(data).filter(entry => invenoryAllowedFields.includes(entry[0]))
        let productUpdated = true
        let inventoryUpdated = true
        let inventoryId = null

        if (filteredData.length <= 0) return false

        if (productData.length > 0) {
            const setStatement = productData.map((entry, i) => `${entry[0]} = $${i + 2}`)
            const query = `UPDATE product SET ${setStatement.join(' ,')} WHERE id = $1 RETURNING inventory_id`
            const response = await pool.query(query, [id, ...productData.map(e => e[1])])
            productUpdated = response.rowCount > 0
            inventoryId = response?.rows?.length > 0 ? response.rows[0].inventory_id : null
        }

        if (inventoryData.length > 0 && inventoryId === null) {
            const response = await pool.query('SELECT * FROM product WHERE id = $1', [id])
            inventoryId = response?.rows?.length > 0 ? response.rows[0].inventory_id : null
        }
        
        if (inventoryData.length > 0) {
            if (inventoryId === null) return false
            
            const setStatement = inventoryData.map((entry, i) => `${entry[0]} = $${i + 2}`)
            const query = `UPDATE product_inventory SET ${setStatement.join(' ,')} WHERE id = $1`
            const response = await pool.query(query, [inventoryId, ...inventoryData.map(entry => entry[1])])
            inventoryUpdated = response.rowCount > 0
        }

        return inventoryUpdated && productUpdated
    }
}

const addProductImage = (pool) => {
    return async (id, public_id, url) => {
        const query = await pool.query(`INSERT INTO product_image (product_id, public_id, url) VALUES ($1, $2, $3) RETURNING id`, [id, public_id, url])

        return query.rows.length > 0 ? query.rows[0].id : null
    }
}

const addProductImages = (pool) => {
    return async (id, images) => {
        const imagesData = Array.isArray(images) ? images.filter(img => 'url' in img && 'public_id' in img) : []

        if (imagesData.length <= 0) return null

        const query = `INSERT INTO product_image (product_id, public_id, url) VALUES ${imagesData.map((v, i) => `($${3 * i + 1}, $${3 * i + 2}, $${3 * i + 3})`).join(', ')} RETURNING id, url`
        const values = imagesData.reduce((arr, img) => {
            arr.push(id, img.public_id, img.url)
            return arr
        }, [])

        const response = await pool.query(query, values)

        return response.rows || []
    }
}

module.exports = (pool) => {
    return {
        createProduct: createProduct(pool),
        deleteProduct: deleteProduct(pool),
        getProductsList: getProductsList(pool),
        updateProduct: updateProduct(pool),
        addProductImage: addProductImage(pool),
        addProductImages: addProductImages(pool)
    }
}