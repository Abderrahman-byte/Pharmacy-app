import React, { createContext, useEffect, useState } from 'react'

import { getRequest } from '../utils/http'

export const AuthContext = createContext({})

export const AuthProvider = ({ children}) => {
    const [authenticated, setAuth] = useState(undefined)
    const [userData, setUserData] = useState(undefined)

    useEffect(async () => {
        const data = await getRequest('api/auth')

        if (!data) {
            setAuth(false)
            setUserData(null)
        } else {
            setAuth(true)
            setUserData(data)
        }

    }, [])

    return (
        <AuthContext.Provider value={{ authenticated, userData }} >
            {children}
        </AuthContext.Provider>
    )
}