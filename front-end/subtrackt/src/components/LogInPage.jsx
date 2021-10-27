import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const setUsername = (uname) => {
    this.state.username = uname;
};
const setPassword = (pswd) => {
    this.state.password = pswd;
};

const LogInPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handlers ==================================================================================================
    const handleUsername= (event) => {
        console.log(`Username changed to: ${event.target.value}`);
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        console.log(`Password set to: ${event.target.value}`);
        setPassword(event.target.value);
    };
    const handleSubmit = async e => {
        // prevent the HTML form from actually submitting 
        e.preventDefault()
        console.log("Submit form");
        props.handleSubmit({
            username: currUsername,
            password: currPassword
        });
    }

    if (username==""){ return(
        <div className="Login">
        <form>
            <label>Log In:</label>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={currUsername}
                    onChange={handleUsername}
                    placeholder="Username"
                />
            </div>
            <br />
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={handlePassword}
                    placeholder="Password"
                />
            </div>
            <br />
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form></div>
    
        );
    }
    else return <Redirect to="/" />
};

export default LogInPage;