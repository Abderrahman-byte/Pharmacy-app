import React from 'react'
import { Link } from 'react-router-dom'

const ProductRow = ({ data }) => {
    return (
        <tr className='ProductRow'>
            <td>{data.id}</td>
            <td><Link to={`/admin/products/${data.id}/edit`}>{data.title}</Link></td>
            <td>{Number(data.price)}$</td>
            <td>{data.quantity}</td>
            <td>{new Date(data.created_date).toLocaleString()}</td>
        </tr>
    )
}

export default ProductRow