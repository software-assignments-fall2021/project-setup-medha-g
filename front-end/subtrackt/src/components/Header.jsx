import React from 'react';
import {Link} from 'react-router-dom';
import LogoutPage from './LogOutPage';

const Header = () => {
    return (
        <div className="header">
            <Link to="/landing">Landing Page</Link>
            <Link to="/sub_list">Subscription List</Link>
            <LogoutPage/>
        </div>
    )
}

export default Header;