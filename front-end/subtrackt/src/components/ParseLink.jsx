import React, { useCallback } from 'react';
import { PlaidLink } from 'react-plaid-link';

const ParseLink = props => {
    const onExit = (error, metatdata) => console.log('onExit', error, metatdata);
    const onEvent = (eventName, metadata) => console.log('onEvent', eventName, metadata);
    const onSuccess = useCallback((token, metadata) => {
        console.log("On Success");
        props.getAccessToken(token);
    }, [props]);

    return (
        <PlaidLink 
        className="plaid-button custom-button" 
        token={props.token ? props.token : ''} 
        onExit={onExit} 
        onSuccess={onSuccess} 
        onEvent={onEvent}>
            Connect Account
        </PlaidLink>
    )
}

export default ParseLink;