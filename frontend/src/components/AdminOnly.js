import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

const AdminOnly = ({ children }) => {
    const { authenticated, userData } = useContext(AuthContext)
    
    if (authenticated === undefined) {
        return (<></>)
    } else if (!authenticated || !userData || !userData.is_admin) {
        return (<p>Not Allowed</p>)
    } else {
        return (<>{children}</>)
    }
}

export default AdminOnly