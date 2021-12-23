import { Route, Routes } from 'react-router'

import MainPage from '../pages/Main.page'

import '../styles/App.css'

function App() {
    return (
        <Routes>
            <Route path="/*" element={<MainPage />} />
        </Routes>
    )
}

export default App
