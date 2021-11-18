import React, { useState } from "react";
import {useHistory, useLocation, Link} from "react-router-dom";
import { useAuth } from "./use-auth";

import twitter from '../images/twitter-icon.png';
import facebook from '../images/facebook-icon.png';
import linkedin from '../images/linkedin-icon.png';
import instagram from '../images/instagram-icon.png';
import eye from '../images/eye.png';

const LogInPage = (props) => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let {from} = location.state || {fromt : {pathname:"/"}}

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handlers ==================================================================================================
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = e => {
        // prevent the HTML form from actually submitting 
        e.preventDefault();
        auth.signin(username, password, history.replace(from));
    }

    return (
        <div className="Login">
            <div>
            <form className="custom-form">
                <label>Log In:</label>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={handleUsername}
                        placeholder="Username"
                    />
                </div>
                <br />
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={handlePassword}
                        placeholder="Password"

                    />
                </div>
                <br />
                <button type="submit" className="custom-button" onClick={handleSubmit}>Submit</button>
                <button className="custom-button" onClick={props.handleChange}>Signup</button>
            </form>
            </div>
        <div class="footer-dark footer-login">
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Resources</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6 item text">
                        <h3>SubTrackt</h3>
                        <p>SubTrackt is a Web Application that allows users to keep track of their subscriptions. Subscriptions are either populated via credit card transaction history or via manual entering. Users also have the opportunity to cancel and add subscriptions that they are interested in through SubTrackt and they can evaluate exactly where each of their money is going.</p>
                    </div>
                    <div class="col item social"><a href="#"><i class="icon ion-social-facebook"><img src={facebook} height="20px"></img></i></a><a href="#"><i class="icon ion-social-twitter"><img src={twitter} height="20px"></img></i></a><a href="#"><i class="icon ion-social-snapchat"><img src={linkedin} height="20px"></img></i></a><a href="#"><i class="icon ion-social-instagram"><img src={instagram} height="20px"></img></i></a></div>
                </div>
                <p class="copyright">SubTrackt © 2021</p>
            </div>
        </footer>
    </div>
            {auth.errMessage ? <div>{auth.errMessage}</div> : null}
        </div>

    );
};

export default LogInPage;