import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { v4 as uuidV4} from 'uuid'

import ProductForm from '../components/ProductForm'
import { getChangedData } from '../utils/generic'
import { apiHttpRequest, getRequest, postFormData } from '../utils/http'

const EditProductPage = () => {
    const { id } = useParams()
    const { state } = useLocation()

    const [productData, setProductData] = useState(undefined)
    const [images, setImages] = useState([])
    const [deletedImages, setDeletedImages] = useState([])
    const [errors, setErrors] = useState(null)

    useEffect(async () => {
        if (!id) return

        const response =  'initData' in (state||{}) ? { data: state?.initData } :  await getRequest(`api/products/${id}`)
        const pData = {...(response.data || {})}

        delete pData?.images
        
        setProductData(pData || {})
        setImages(response.data?.images?.map(img => {
            return {...img, saved: true}
        }))

    }, [])

    const removeImageCallback = (id) => {
        const img = images.find(im => im.id == id)

        setImages(images.filter(im => im.id != id))

        if (img.saved) setDeletedImages([...deletedImages, img])
    }

    const addImage = (e) => {
        const { files } = e.target
        const reader = new FileReader()
        
        reader.onload = (e) => setImages([...images, {id: uuidV4(), url: reader.result, saved: false, file: files[0]}])
        reader.readAsDataURL(files[0])
    }

    const submitCallback = async (data) => {
        const changedData = getChangedData(productData, data)
        const addedImages = images.filter(img => !img.saved)

        if (Object.keys(changedData).length > 0) {
            const response = await apiHttpRequest(`api/products/${id}`, 'PUT', JSON.stringify(changedData))
            if (response.ok) setProductData({...productData, ...data})
        }
        
        if (addedImages.length > 0) {
            const fd = new FormData()
            let i = 0
            
            addedImages.forEach(img => fd.append('images', img.file))
            const response = await postFormData(`api/products/${id}/images`, fd)

            setImages(images.map(im => {
                if (addedImages.findIndex(img => img.id == im.id) < 0) return im

                return {
                    ...im,
                    saved: true,
                    id: response?.data[i++]?.id || im.id
                }
            }))
        }

        if (deletedImages.length > 0) {
            const deletedImagesIds = deletedImages.map(img => img.id)

            const response = await apiHttpRequest(`api/products/${id}/images`, 'DELETE', JSON.stringify({ ids: deletedImagesIds}))

            if (response.ok) setDeletedImages([])
        }
    } 
    
    return (<div className='EditProductPage'>
        <h2>Update Product Data</h2>
        <div className='form-container' style={{ width:'fit-content'}}>
            <ProductForm imageInputChanged={addImage} removeImage={removeImageCallback} initValue={productData} btnText='Save' errors={errors} images={images} submitCallback={submitCallback}  />
        </div>
    </div>)
}

export default EditProductPage