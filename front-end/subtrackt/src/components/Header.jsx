import React from 'react';
import { Link } from 'react-router-dom';
import LogoutPage from './LogOutPage';

const Header = () => {
    return (
        <div className="navbar">
            <Link className="navbar-nav" to="/landing">Landing Page</Link>
            <Link className="navbar-nav" to="/sub_list">Subscription List</Link>
            <LogoutPage />
        </div>
    )
}

export default Header;