import React, { useContext, createContext } from "react";
import useToggle from "./use-toggle";

const veilContext = createContext();

export const ProvideVeil = ({children}) => {
    const veil = useToggle();
    return <veilContext.Provider value={veil}>{children}</veilContext.Provider>
}

export const useVeil = () => {
    return useContext(veilContext);
}
