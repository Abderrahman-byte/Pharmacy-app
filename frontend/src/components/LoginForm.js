import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { postRequest } from '../utils/http'
import { getfieldsComponents, loginFields } from '../utils/forms'

const LoginForm = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])
    const { setUserData, setAuth } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const submitCallback = async (e) => {
        e.preventDefault()
        const data = await postRequest('api/auth/login', JSON.stringify(formData))

        if (data.ok && data.data) {
            setUserData(data.data)
            setAuth(true)
            setTimeout(() => navigate(location?.state?.from || '/'), 0)
        } else if (!data.ok) {
            setErrors(data?.errors || ['Something went wrong, please try again.'])
        }
    }

    const updatedData = (e) => {
        const { value, name } = e.target
        const data = {...formData}
        data[name] = value

        setFormData({...data})
    }

    return (
        <form onSubmit={submitCallback} className='LoginForm'>
            {getfieldsComponents(loginFields, updatedData)}
            
            {errors && errors.length > 0 ? (
                <div className='errors-div'>
                    {errors.map((error, i) => <p key={i} className='error-alert'>{error}</p>)}
                </div>
            ) : null}

            <button className='btn btn-submit'>Login</button>
        </form>
    )
}

export default LoginForm