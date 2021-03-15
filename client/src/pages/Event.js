import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENT, QUERY_DISH } from '../utils/queries';





const Event = () => {
    //  destructuring variable defined in route path 
    const { eventId } = useParams();
    const { data } = useQuery(QUERY_EVENT, {
        variables: { eventId }
    });

    const event = data?.event || '';


    // const [dishId, setDishId] = useState('');
    // const { data: dishData } = useQuery(QUERY_DISH, {
    //     variables: { dishId }
    // });

    // let dishObj = dishData?.dish || '';


    console.log("id: ", eventId, "event", event, data);

    return (
        <>
            <ul style={{ listStyle: "none" }}>
                <li style={{ fontWeight: "bolder" }}>{event.eventName}</li>

                <li>{event.date}</li>
                <li>{event.time}</li>
                <li>{event.location}</li>
                {/* <li>{event.host.firstName}</li> */}
                <h4 style={{ marginBottom: '0.1rem' }}>Guest List:</h4>
            </ul>
            {event.guests.map(guest => (
                <ul key={guest} style={{ listStyle: "none" }} >
                    <li style={{ margin: '0.5rem' }}>Email: {guest}</li>
                </ul>
            ))}
            <h4 style={{ marginBottom: '0.1rem' }}>Dishes List:</h4>

            {event.dishes.map(dish => (
                <div key={dish._id} style={{ listStyle: "none" }}>
                    {/* {dishObj && (
                        <>
                            {setDishId(dish)}
                            <p> {dishObj.dishType}</p>
                        </>
                    )
                    } */}
                    <button>SignUp</button>
                </div>
            ))
            }

            <button style={{ margin: '1rem' }}>Update form</button>


        </>
    )
}

export default Event;


