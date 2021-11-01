import React from 'react';
// import {Link} from 'react-router-dom';
import LogoutPage from './LogOutPage';

const Header = () => {
    return (
        <div className="header">
             <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/landing">
                    SubTrackt
                </a>
                <a className="navbar-brand" href="/sub_list">
                    Subscriptions
                </a>
                <a className="navbar-brand" href="./LogOutPage">
                <LogoutPage/>
                </a>
                </nav>
            {/* <Link to="/landing">Landing Page</Link>
            <Link to="/sub_list">Subscription List</Link>
            <LogoutPage/> */}
        </div>
    )
}

export default Header;