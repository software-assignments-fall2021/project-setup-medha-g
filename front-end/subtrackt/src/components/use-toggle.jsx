import {useState} from 'react';

const useToggle = () => {
    const [val, setToggle] = useState(false);

    const trigger = () => {
        setToggle(prev => !prev);
    }

    return {val, trigger};
}

export default useToggle;