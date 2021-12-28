import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminOnly from '../components/AdminOnly'
import NewProductPage from './NewProduct.page'
import ProductsAdminPage from './ProductsAdmin.page'

const AdminPage = () => {
    return (
        <AdminOnly>
            <Routes>
                <Route exact path='/products' element={<ProductsAdminPage />} />
                <Route exact path='/products/new' element={<NewProductPage />} />
            </Routes>
        </AdminOnly>
    )
}

export default AdminPage
