import React from 'react';
import { useVeil } from './use-veil';

const Veil = ({ children }) => {
    const toggleVeil = useVeil();

    return (<div className="veil" style={toggleVeil.val ? { pointerEvents: "none", opacity: "0.4" } : {}}>
        {children}
    </div>)
}

export default Veil