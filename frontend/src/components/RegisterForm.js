import React, { useContext, useState } from 'react'

import { postRequest } from '../utils/http'
import { registerFields, getfieldsComponents } from '../utils/forms'
import { AuthContext } from '../context/AuthContext'
import { useLocation, useNavigate } from 'react-router'

import '../styles/forms.scss'
import '../styles/RegisterForm.scss'

const RegisterForm = () => {
    const [formData, setData] = useState({})
    const [errors, setErrors] = useState([])
    const { setUserData, setAuth } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const updateData = (e) => {
        const { target } = e
        const data = {...formData}

        if (target.type === 'checkbox') data[target.name] = target.checked
        else data[target.name] = target.value

        setData({...data})
    }
    
    const submitData = async (e) => {
        e.preventDefault()
        const data = await postRequest('api/auth/register', JSON.stringify(formData))    
        
        setErrors([])

        if (!data.ok || !data.data)
            return setErrors(data?.errors || ['Something Went wrong please try again'])

        const userData = {...formData, ...data.data}

        delete userData.password
        delete userData.password2

        setUserData(userData)
        setAuth(true)
        setTimeout(() => navigate(location?.state?.from || '/'), 0)
    }

    return (<form className='RegisterForm' onSubmit={submitData} >
        {getfieldsComponents(registerFields, updateData)}

        {errors && errors.length > 0 ? (
            <div className='errors-div'>
                {errors.map((error, i) => <p key={i} className='error-alert'>{error}</p>)}
            </div>
        ) : null}

        <button className='btn submit-btn'>Sign Up</button>
    </form>)
}

export default RegisterForm