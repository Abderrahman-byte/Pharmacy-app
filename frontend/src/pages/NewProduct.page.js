import React, { createRef, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidV4 } from 'uuid'
import ProductForm from '../components/ProductForm'
import { postRequest } from '../utils/http'

import '../styles/NewProductPage.scss'

const NewProductPage = () => {
    const [errors, setErrors] = useState([])
    const [images, setImages] = useState([])
    const navigate = useNavigate()
    const maxImages = 4

    const imageChangeHandler = useCallback((e) => {
        const { files } = e.target
        const fileReader = new FileReader()

        if (images.length >= maxImages) {
            const before = [...errors]
            setErrors([...errors, `Max number of images is ${maxImages}.`])
            setTimeout(() => setErrors(before), 3000)
            return
        }
    
        fileReader.onload = ev => setImages([...images, { url: ev.target.result, id: uuidV4(), file: files[0] }])
        fileReader.readAsDataURL(files[0])
    }, [images, errors])

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

    const removeImage = useCallback((id) => {
        setImages(images.filter(img => img.id !== id))
    }, [images])

    return (
        <div className='NewProductPage'>
            <div className='container'>
                <h1>Create New Product</h1>
                <div>
                    <ProductForm removeImage={removeImage} images={images} imageInputChanged={imageChangeHandler} submitCallback={submitCallback} btnText='Create' errors={errors} />
                </div>
            </div>
        </div>
    )
}

export default NewProductPage