import React from 'react'

import AdminOnly from '../components/AdminOnly'

const AdminPage = () => {
    return (
        <AdminOnly>
            <div className="AdminPage">
                <p>
                    This an admin page
                    <br />
                    Because you're an admin we let you in.
                </p>
            </div>
        </AdminOnly>
    )
}

export default AdminPage
