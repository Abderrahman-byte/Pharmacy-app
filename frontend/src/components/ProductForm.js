import React, { useEffect, useState } from 'react'

import { getfieldsComponents, productFields } from '../utils/forms'

const ProductForm = ({ submitCallback, btnText, initValue, errors }) => {
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
        <form onSubmit={submitForm} className="form product-form">
            {getfieldsComponents(productFields, updatedData, initValue)}

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
