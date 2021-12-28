import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import ProductForm from '../components/ProductForm'
import { postRequest } from '../utils/http'

import '../styles/NewProductPage.scss'

const NewProductPage = () => {
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const submitCallback = async (data) => {
        setErrors([])

        const response = await postRequest('api/products', JSON.stringify(data))

        if (!response.ok) {
            setErrors(response.errors || ['Someting went wrong, please try later'])
            return
        }

        navigate(`/admin/products/${response?.data?.id}/edit`, {
            state: { initData: { ...data } }
        })
    }

    return (
        <div className='NewProductPage'>
            <div className='container'>
                <h1>Create New Product</h1>
                <div>
                    <ProductForm submitCallback={submitCallback} btnText='Create' errors={errors} />
                </div>
            </div>
        </div>
    )
}

export default NewProductPage