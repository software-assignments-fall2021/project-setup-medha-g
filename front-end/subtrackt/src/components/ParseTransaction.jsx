import React from 'react';
import axios from "axios";


const ParseTransactions = props => {

    const handleParse = () => {
        
        const call = axios.get('http://localhost:4090/api/parsetrans/parse');
        
    }


    return (
        <button className="btn btn-primary" onClick={handleParse} >Parse Transactions</button>
    )
}

export default ParseTransactions;