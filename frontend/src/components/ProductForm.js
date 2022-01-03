import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { getfieldsComponents, productFields } from '../utils/forms'
import ImageProduct from './ImageProduct'

import '../styles/ProductForm.scss'

const ProductForm = ({ submitCallback, btnText, initValue, errors, imageInputChanged, images, removeImage }) => {
    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (typeof initValue === 'object') setFormData(initValue)
    }, [])

    const updatedData = (e) => {
        const { value, name } = e.target
        const data = { ...formData }
        data[name] = value

        setFormData({ ...data })
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (typeof submitCallback === 'function') submitCallback(formData)
    }

    return (
        <form onSubmit={submitForm} className="form ProductForm">
            {getfieldsComponents(productFields, updatedData, initValue)}

            <div className='form-div'>
                <label className='images-label' htmlFor='product-images-input' >
                <FontAwesomeIcon icon={faPlus} /> Add Image</label>
                <input onChange={imageInputChanged} type='file' accept='image/*' id='product-images-input'/>
            </div>

            {images && images.length > 0 ? (
                <div className='images form-div'>
                    {images.map((image,i) => <ImageProduct removeImageCallback={() => removeImage(image.id || i)} key={i} url={image.url} />)}
                </div>
            ): null} 

            {errors && errors.length > 0 ? (
                <div className='errors-div'>
                    {errors.map((error, i) => <p key={i} className='error-alert'>{error}</p>)}
                </div>
            ) : null}

            <button className="submit-btn">{btnText}</button>
        </form>
    )
}

export default ProductForm
