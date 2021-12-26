import React from 'react'

import RegisterForm from '../components/RegisterForm'

import '../styles/RegisterPage.scss'

const RegisterPage = () => {
    return (
        <div className='RegisterPage'>
            <h1>Sign up</h1>
            <RegisterForm />
        </div>
    )
}

export default RegisterPage
