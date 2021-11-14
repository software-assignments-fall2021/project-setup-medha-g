import React from 'react';
import LogInPage from './LogInPage';
import RegisterPage from './RegisterPage';
import useToggle from './use-toggle';

const LogOrReg = () => {
    let seereg = useToggle();
    
    return (
        seereg.val ? <RegisterPage handleChange={seereg.trigger} /> : <LogInPage handleChange={seereg.trigger}/>
    )
}

export default LogOrReg;