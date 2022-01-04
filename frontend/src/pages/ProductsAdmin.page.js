import React, { useEffect, useState } from 'react'
import ProductsTable from '../components/ProductsTable'

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
        <div className='ProductsAdminPage'>
            <div className='container'>
                <ProductsTable products={productsList} />
            </div>
        </div>
    )
}

export default ProductsAdminPage