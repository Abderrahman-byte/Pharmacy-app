import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children}) => {
    const [authenticated, setAuth] = useState(undefined)
    const [userData, setUserData] = useState(undefined)

    return (
        <AuthContext.Provider value={{ authenticated, userData }} >
            {children}
        </AuthContext.Provider>
    )
}