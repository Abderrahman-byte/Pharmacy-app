import React from 'react'
import ProductRow from './ProductRow'

import '../styles/ProductsTable.scss'

const ProductsTable = ({ products }) => {

    return (
    <table className='ProductsTable'>
        <thead>
            <tr>
                <th></th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Created Date</th>
            </tr>
        </thead>

        <tbody>
            {products.map(data => <ProductRow data={data} key={data.id} />)}
            <tr>
                <td className='more-btn' colSpan={5}>Display More</td>
            </tr>
        </tbody>
    </table>
    )
}

export default ProductsTable