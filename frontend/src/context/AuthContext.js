import React, { createContext, useEffect, useState } from 'react'

import { getRequest } from '../utils/http'

export const AuthContext = createContext({})

export const AuthProvider = ({ children}) => {
    const [authenticated, setAuth] = useState(undefined)
    const [userData, setUserData] = useState(undefined)

    useEffect(async () => {
        const response = await getRequest('api/auth')

        if (!response || !response.ok || !response.data) {
            setAuth(false)
            setUserData(null)
        } else {
            setAuth(true)
            setUserData(response.data)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ authenticated, userData, setUserData, setAuth }} >
            {children}
        </AuthContext.Provider>
    )
}