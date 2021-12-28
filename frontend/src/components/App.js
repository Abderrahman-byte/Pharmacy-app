import React from 'react'
import { Route, Routes } from 'react-router'

import MainPage from '../pages/Main.pages'
import AdminPage from '../pages/Admin.pages'
import AuthPage from '../pages/Auth.pages'
import AuthenticatedOnly from './AuthenticatedOnly'

import '../styles/App.css'

const App = () => {
    return (
        <Routes>
			<Route path="/admin/*" element={<AuthenticatedOnly><AdminPage /></AuthenticatedOnly>} />
			<Route path="/auth/*" element={<AuthPage />} />
            <Route path="/*" element={<MainPage />} />
        </Routes>
    )
}

export default App
