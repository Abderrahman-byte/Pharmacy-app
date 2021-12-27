import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from './Login.page'
import RegisterPage from './Register.page'

const AuthPage = () => {
    return (
        <Routes>
            <Route index element={<Navigate to='./login' />} />
            <Route exact path='/signup' element={<RegisterPage />} />
            <Route exact path='/login' element={<LoginPage />} />
        </Routes>
    )
}

export default AuthPage