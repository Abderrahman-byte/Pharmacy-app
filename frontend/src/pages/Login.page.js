import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import LoginForm from '../components/LoginForm' 

import '../styles/RegisterPage.scss'

const LoginPage = () => {
    const location = useLocation()

    return (
        <div className='LoginPage RegisterPage'>
            <div className='form-card'>
                <h1 className='form-title'>Login</h1>
                <hr />
                <LoginForm />
                <hr />
                <div className='info-div'>
                    <p>Don't have an account?</p>
                    <Link to='/auth/signup' state={{from : location?.state?.from || '/'}} >Sign up</Link>      
                </div>
            </div>
        </div>
    )
}

export default LoginPage