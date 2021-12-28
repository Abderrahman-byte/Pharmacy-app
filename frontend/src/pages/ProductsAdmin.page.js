import React, { useEffect, useState } from 'react'

import { getRequest } from '../utils/http'

const ProductsAdminPage = () => {
    const [productsList, setProducts] = useState([])
    let currentPage = 1

    useEffect(async () => {
        const response = await getRequest(`api/products?page=${currentPage++}`)
        
        if (!response?.ok || !response?.data) return

        setProducts([...productsList, ...response.data])
    }, [])

    return (
        <div>
            products page
        </div>
    )
}

export default ProductsAdminPage