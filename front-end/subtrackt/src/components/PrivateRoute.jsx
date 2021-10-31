import React from "react";
import {Route, Redirect} from 'react-router';
import { useAuth } from "./use-auth";

const PrivateRoute = ({children, ...rest}) => {
    let auth = useAuth();

    return (
        <Route {...rest} render={({location}) => {
            return auth.user ? (
                children
            ) : (
                <Redirect to={{pathname:"/login", state: {from:location}}} />
            )
        }} />
    )
}

export default PrivateRoute;