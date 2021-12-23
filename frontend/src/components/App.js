import { Route, Routes } from 'react-router'

import MainPage from '../pages/Main.page'
import AdminPage from '../pages/Admin.page'
import AuthPage from '../pages/Auth.page'
import AuthenticatedOnly from './AuthenticatedOnly'

import '../styles/App.css'

function App() {
    return (
        <Routes>
			<Route path="/admin/*" element={<AuthenticatedOnly><AdminPage /></AuthenticatedOnly>} />
			<Route path="/auth/*" element={<AuthPage />} />
            <Route path="/*" element={<MainPage />} />
        </Routes>
    )
}

export default App
