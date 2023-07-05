import { useEffect, useMemo, useState } from 'react';
import { getStorageValue } from '../classes/Utils';


const useLocalStorageState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>]  => {
    const [state, setState] = useState(useMemo(() => getStorageValue(key, initialValue,), []));

    useEffect(() =>{
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
};

export default useLocalStorageState;