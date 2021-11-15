import React from 'react';
import ParseLink from './ParseLink';
import ParseTransactions from './ParseTransaction';

const ParseOption = props => {
    return (
        props.access_token ? <ParseTransactions /> : <ParseLink token={props.token} getAccessToken={props.getAccessToken} />
    )
}

export default ParseOption;
