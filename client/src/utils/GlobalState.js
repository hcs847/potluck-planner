import React, { createContext, useContext } from 'react';
import { useAppReducer } from './reducers';


const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useAppReducer({
        events: [
            {
                _id: 1001,
                eventName: "Office Party",
                message: "Welcome to the annual party",
                date: "04-01-2021",
                time: "12:00 PM",
                location: "The Kitchen",
                host: {
                    firstName: "Test",
                    lastName: "Tester",
                    email: "tester@email.com"
                },
                dishes: [
                    { dishDescription: "", dishType: "Mains", dishId: 2001 },
                    { dishDescription: "", dishType: "Sides", dishId: 2002 },
                    { dishDescription: "", dishType: "Salads", dishId: 2003 },
                    { dishDescription: "", dishType: "Desserts", dishId: 2004 },
                    { dishDescription: "", dishType: "Drinks", dishId: 2005 }
                ],
                guests: [
                    {
                        userId: 3001,
                        guestName: "John Doe",
                        guestEmail: "jdoe@email.com"
                    },
                    {
                        userId: 3002,
                        guestName: "Jane Smith",
                        guestEmail: "jsmith@email.com"
                    },
                    {
                        userId: 3003,
                        guestName: "Sam Mars",
                        guestEmail: "smars@email.com"
                    }

                ]

            }
        ]
    })

    // test
    console.log("state.events: ", state.events);

    // // actions
    // function addEvent(event) {
    //     dispatch({
    //         type: 'ADD_EVENT',
    //         payload: event
    //     });
    // }

    return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };