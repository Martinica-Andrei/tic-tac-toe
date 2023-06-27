import { useState } from 'react';

const useEnumState = <T,>(...values : T[]) : [T, ...(() => void)[]] => {
    const [state, setState] = useState(values[0]);

    let funcs : (() => void)[] = [];
    for(let value of values){
        funcs.push(() =>{
            setState(value);
        });
    }
    return [state, ...funcs];
};

export default useEnumState;