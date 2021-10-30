import React, { useState } from "react";
import {useHistory, useLocation} from "react-router-dom";
import { useAuth } from "./use-auth";

const LogInPage = (props) => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let {from} = location.state || {fromt : {pathname:"/"}}

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handlers ==================================================================================================
    const handleUsername = (event) => {
        console.log(`Username changed to: ${event.target.value}`);
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        console.log(`Password set to: ${event.target.value}`);
        setPassword(event.target.value);
    };
    const handleSubmit = e => {
        // prevent the HTML form from actually submitting 
        e.preventDefault();
        auth.signin(username, password, history.replace(from));
    }

    return (
        <div className="Login">
            <form>
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
                        type="text"
                        className="form-control"
                        value={password}
                        onChange={handlePassword}
                        placeholder="Password"
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>

    );
};

export default LogInPage;