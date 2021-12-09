import React from 'react';
import { Link } from 'react-router-dom';

import twitter from '../images/twitter-icon.png';
import facebook from '../images/facebook-icon.png';
import linkedin from '../images/linkedin-icon.png';
import instagram from '../images/instagram-icon.png';

const Footer = () => {

    return (
            <div className="footer-dark footer-login">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Learn More About Subtrackt</h3>
                            <ul>
                                <Link to="/faqpage">FAQ</Link>
                            </ul>
                            <ul>
                                <Link to="/team">Team</Link>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>SubTrackt</h3>
                            <p>SubTrackt is a Web Application that allows users to keep track of their subscriptions. Subscriptions are either populated via credit card transaction history or via manual entering. Users also have the opportunity to cancel and add subscriptions that they are interested in through SubTrackt and they can evaluate exactly where each of their money is going.</p>
                        </div>
                        <div className="col item social">
                            <a href="https://www.facebook.com/">
                                <i className="icon ion-social-facebook">
                                    <img src={facebook} height="20px" alt="" />
                                </i>
                            </a>
                            <a href="https://twitter.com/home">
                                <i className="icon ion-social-twitter">
                                    <img src={twitter} height="20px" alt="" />
                                </i>
                            </a>
                            <a href="https://www.linkedin.com/feed/">
                                <i className="icon ion-social-snapchat">
                                    <img src={linkedin} height="20px" alt="" />
                                </i>
                            </a>
                            <a href="https://www.instagram.com/">
                                <i className="icon ion-social-instagram">
                                    <img src={instagram} height="20px" alt="" />
                                </i>
                            </a>
                        </div>
                    </div>
                    <p className="copyright">SubTrackt © 2021</p>
                </div>
            </footer>
        </div>)
}

export default Footer;