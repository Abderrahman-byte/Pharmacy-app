import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

import { AuthContext } from '../context/AuthContext'

import '../styles/Header.scss'
import cartIcon from '../assets/shopping-cart.png'

const Header = () => {
    const { userData, authenticated } = useContext(AuthContext)
    const location = useLocation()

    return (
        <header className="Header">
            <div className="container">
                <div className="logo-div">
                    <Link className="logo" to="/">Pharmacy App</Link>
                </div>

                <nav className="nav-bar">
                    {!authenticated ? (
                        <div className="auth-btn-div">
                            <Link to="/auth/login">Login</Link>
                            <Link to="/auth/signup">Signup</Link>
                        </div>
                    ) : (
                        <div className='logged-div'>
                            <p>Logged in as {userData?.username}</p>
                            <Link to="/auth/logout" state={{ from:  location.pathname }}>Logout</Link>
                        </div>
                    )}

                    <div className="cart-btn-div">
                        <Link className="cart-btn" to="/">
                            <img src={cartIcon} />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header