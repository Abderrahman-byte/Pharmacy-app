import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RegisterPage from './Register.page'

const AuthPage = () => {
    return (
        <Routes>
            <Route exact path="/signup" element={<RegisterPage />} />
        </Routes>
    )
}

export default AuthPage