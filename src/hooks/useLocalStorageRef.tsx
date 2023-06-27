import { useMemo, useRef } from 'react';

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
        this. data = data;
        this.updateLocalStorage();
    }
}

const getStorageValue = <T,>(key: string, initialValue: T) => {
    const saved = localStorage.getItem(key);
    let data = initialValue;
    if (saved !== null) {
        data = JSON.parse(saved);
    }
    else{
        localStorage.setItem(key, JSON.stringify(initialValue));
    }
    const customCurrent = new DataWithUpdate(key, data);
    return customCurrent;
}

/**
 * 
 * @param key  key in local storage
 * @param initialValue  if key is not in local storage 
 * @returns  returns an Object with 2 properties, data, with initialValue or localStorage value and updateLocalStorage
 * that modifies localStorage data 
 */
const useLocalStorageRef = <T,>(key: string, initialValue: T) => {
    const ref = useRef(useMemo(() => getStorageValue(key, initialValue), []));

    return ref;
};

export default useLocalStorageRef;