import React from 'react';

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
                            <h3>Services</h3>
                            <ul>
                                <li><a href="/">Development</a></li>
                                <li><a href="/">Resources</a></li>
                                <li><a href="/">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="/">Company</a></li>
                                <li><a href="/">Team</a></li>
                                <li><a href="/">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>SubTrackt</h3>
                            <p>SubTrackt is a Web Application that allows users to keep track of their subscriptions. Subscriptions are either populated via credit card transaction history or via manual entering. Users also have the opportunity to cancel and add subscriptions that they are interested in through SubTrackt and they can evaluate exactly where each of their money is going.</p>
                        </div>
                        <div className="col item social">
                            <a href="/">
                                <i className="icon ion-social-facebook">
                                    <img src={facebook} height="20px" alt="" />
                                </i>
                            </a>
                            <a href="/">
                                <i className="icon ion-social-twitter">
                                    <img src={twitter} height="20px" alt="" />
                                </i>
                            </a>
                            <a href="/">
                                <i className="icon ion-social-snapchat">
                                    <img src={linkedin} height="20px" alt="" />
                                </i>
                            </a>
                            <a href="/">
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