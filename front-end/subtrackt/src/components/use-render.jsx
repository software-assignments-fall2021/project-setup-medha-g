import {useState, useCallback} from 'react';

const useRender = () => {
    const [state, updateState] = useState();
    const update = useCallback(() => {
        updateState({});
    }, [])
    return {state, update};
}

export default useRender
