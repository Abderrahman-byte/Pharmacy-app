import React, { useContext } from "react"
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"

const AuthenticatedOnly = ({ children }) => {
    const { authenticated, userData } = useContext(AuthContext)
    const { pathname } = useLocation()

    if (authenticated === undefined) {
        return (<></>)
    } else if (!authenticated) {
        return (<Navigate to={{
            pathname: "/auth/login",
            state: { from: pathname }
        }} /> )
    } else {
        return (<>{children}</>)
    }
}

export default AuthenticatedOnly