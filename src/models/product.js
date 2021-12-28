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

module.exports = (pool) => {
    return {
        createProduct: createProduct(pool),
        deleteProduct: deleteProduct(pool),
        getProductsList: getProductsList(pool)
    }
}