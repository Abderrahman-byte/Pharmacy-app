import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import '../styles/ImageProduct.scss'

const ImageProduct = ({ url, removeImageCallback }) => {
    return (
        <div className='ImageProduct'>
            <img src={url} />
            <button type='button' onClick={removeImageCallback}>
                <FontAwesomeIcon icon={faTimesCircle} />
            </button>
        </div>
    )
}

export default ImageProduct