import React, { useState } from "react";


const LogInPage = (props) => {
    const [username] = useState("");
    const [password] = useState("");

    // Handlers ==================================================================================================
    const handleUsername= (event) => {
        console.log(`Username changed to: ${event.target.value}`);
        setTitle(event.target.value);
    };
    const handlePassword = (event) => {
        console.log(`Password set to: ${event.target.value}`);
        setDescription(event.target.value);
    };
    const handleSubmit = () => {
        console.log("Submit form");
        props.handleSubmit({
            username: currUsername,
            password: currPassword
        });
    }

    return (
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
        </form>
    );
};

export default LogInPage;