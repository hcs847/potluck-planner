import React, { createContext, useContext } from 'react';
import { useEventReducer } from './reducers';


const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useEventReducer({
        events: [],
        dishes: [],
        users: [],
        currentEvent: '',
        signUp: true,
        slot: []
    })
    // test
    console.log(state);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };