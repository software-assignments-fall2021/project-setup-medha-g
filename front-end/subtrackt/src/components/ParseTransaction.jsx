import React, { useCallback, useEffect } from 'react';
import axios from "axios";
import { useAuth } from './use-auth';
import  useAsync  from './use-async';
import { useVeil } from './use-veil';


const ParseTransactions = props => {
    const veil = useVeil();
    const auth = useAuth();
    const parseAsync = useCallback(async () => {
        try {
            await axios.get("/api/plaid/parse", {
                headers: {
                    access_token: props.token,
                    Authorization: `Token ${auth.jwt}`
                }
            });

            props.handleRender.update();
        } catch(err) {
            if (err && err.status === 401) auth.signout();
            alert(`Failed to parse subscription: ${err.message}`);
        }
    },[props, auth])

    const parse = useAsync(parseAsync, false);

    useEffect(() => {
        console.log("in use effect", parse, veil)
        if(parse.status === "pending") {
            if(!veil.val) veil.trigger();
        } else {
            if(veil.val) veil.trigger();
        }
    }, [parse.status])

    const handleParse = () => {
        console.log("parsing transaction")
        parse.execute();
    }


    return (
        <button className="custom-button" onClick={handleParse} >Parse Transactions</button>
    )
}

export default ParseTransactions;