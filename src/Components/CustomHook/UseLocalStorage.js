import { useState } from "react";

const UseLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        if(item){
            try {
                return JSON.parse(item);
            }catch{
                return item;
            }
        }
        return initialValue;
    });
    
    const setValue = value => {
        if(typeof value !== "string")
            value = JSON.stringify(value);
        window.localStorage.setItem(key, value);
        setStoredValue(value);
    };
    
    return [storedValue, setValue];
};
export default UseLocalStorage;