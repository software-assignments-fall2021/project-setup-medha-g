import React, { useState } from "react";
import { useAuth } from "./use-auth";
import { useHistory, useLocation } from "react-router-dom";
import useToggle from "./use-toggle";
import Footer from "./Footer.jsx";


const RegisterPage = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const showpass = useToggle();

    let auth = useAuth();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { fromt: { pathname: "/" } }

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
        auth.signup(username, password, history.replace(from));
    }

    return (
        <div className="Register Login">
            <form className="custom-form">
                <label>Register for Subtrackt:</label>
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
                        type={showpass.val ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={handlePassword}
                        placeholder="Password"
                    />
                    Show Password: <input type="checkbox" onClick={showpass.trigger} />
                </div>
                <br />
                <button type="submit" className="custom-button" onClick={handleSubmit}>Submit</button>
                <br/><br/><p className="signup_login_link">Already have an account? <button className="button-link" onClick={props.handleChange}>Sign in</button></p><br/><br/>
            </form>
            <Footer/>
            {auth.errMessage ? <div>{auth.errMessage}</div> : null}
        </div>
    );
};

export default RegisterPage;



