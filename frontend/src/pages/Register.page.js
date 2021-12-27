import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import RegisterForm from '../components/RegisterForm'

import '../styles/RegisterPage.scss'

const RegisterPage = () => {
    const location = useLocation()
    
    return (
        <div className='RegisterPage'>
            <div className='form-card'>
                <h1 className='form-title'>Sign up</h1>
                <hr />
                <RegisterForm />
                <hr />
                <div className='info-div'>
                    <p>Already have an account?</p>
                    <Link to='/auth/login' state={{from : location?.state?.from || '/'}} >Login</Link>      
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
