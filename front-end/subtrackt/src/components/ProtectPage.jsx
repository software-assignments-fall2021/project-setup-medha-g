import React from 'react';
import LogOrReg from './LogOrReg';
import SubscriptionList from './SubscriptionList';
import { useAuth } from './use-auth';

const ProtectPage = () => {
    let auth = useAuth();

    return (
        auth.user ? (<SubscriptionList />) : <LogOrReg />
    )
}

export default ProtectPage;