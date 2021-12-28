import React, { useContext } from "react"
import { Navigate, useLocation } from 'react-router-dom'

import { AuthContext } from "../context/AuthContext"

const AuthenticatedOnly = ({ children }) => {
    const { authenticated } = useContext(AuthContext)
    const location = useLocation()

    if (authenticated === undefined) return (<></>)
    else if (authenticated) return (<>{children}</>) 

    return (<Navigate to="/auth/login" state={{ from: location?.pathname }} />)
}

export default AuthenticatedOnly