import React from 'react';
import axios from "axios";
import { useAuth } from './use-auth';


const ParseTransactions = props => {
    const auth = useAuth();

    const handleParse = () => {
        axios.get("/api/parsetrans/parse", {headers: {
            access_token: props.token, 
            Authorization: auth.jwt
        }}).then(res => {
            
        })
    }


    return (
        <button className="btn btn-primary" onClick={handleParse} >Parse Transactions</button>
    )
}

export default ParseTransactions;