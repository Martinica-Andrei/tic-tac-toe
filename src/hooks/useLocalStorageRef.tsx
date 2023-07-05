import { useMemo, useRef } from 'react';
import { getStorageValue } from '../classes/Utils';

export class DataWithUpdate<T>{
    data : T;
    private readonly key : string;
    constructor(key: string, data : T){
        this.key = key;
        this.data = data;
    }

    updateLocalStorage(){
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    setData(data : T){
        this.data = data;
        this.updateLocalStorage();
    }
}

/**
 * 
 * @param key  key in local storage
 * @param initialValue  if key is not in local storage 
 * @returns  returns an Object with 2 properties, data, with initialValue or localStorage value and updateLocalStorage
 * that modifies localStorage data 
 */
const useLocalStorageRef = <T,>(key: string, initialValue: T) => {
    const ref = useRef(useMemo(() => new DataWithUpdate(key, getStorageValue(key, initialValue)), []));

    return ref;
};

export default useLocalStorageRef;