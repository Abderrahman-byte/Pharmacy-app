import React, { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'

import { AuthContext } from '../context/AuthContext'
import { getRequest } from '../utils/http'

const Logout = () => {
    const { setUserData, setAuth } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(async () => {
        const data = await getRequest('api/auth/logout')

        setAuth(false)
        setUserData(null)
        navigate(location.state?.from || '/')
    }, [])

    return (<div></div>)
}

export default Logout