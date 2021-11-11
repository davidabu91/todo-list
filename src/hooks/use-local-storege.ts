import { useEffect, useState } from "react";

const useLocalStorege = <Tstate>(key: string, newState: Tstate) => {

    const [state, setState] = useState<Tstate>(() => {
        const stateStr = window.localStorage.getItem(key);
        return stateStr ? JSON.parse(stateStr) as Tstate : newState;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));

    }, [key, state])

 

    return [state, setState] as const;
}

export default useLocalStorege;