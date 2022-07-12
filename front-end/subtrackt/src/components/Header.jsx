import React from 'react';
import { Link } from 'react-router-dom';
import LogoutPage from './LogOutPage';
import { useAuth } from './use-auth';
const Header = () => {
    const auth = useAuth();

    return (
        <div className="navbar">
            <Link className="column" to="/landing">
            <img alt="Qries" src={require('../images/logo.png')} width="4.5%"></img></Link>
            <Link className="column login-text" to="/sub_list">{ auth.user ? "Subscription List" : "Log In/Sign Up"}</Link>

            <LogoutPage />
        </div>
    )
}

export default Header;