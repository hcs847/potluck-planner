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


    // console.log("event", event, event.host.firstName);

    return (


        <>
            {event && (
                <>
                    <ul style={{ listStyle: "none" }}>
                        <li style={{ fontWeight: "bolder" }}>{event.eventName}</li>

                        <li>{event.date}</li>
                        <li>{event.time}</li>
                        <li>{event.location}</li>
                        <li>Hosted By: {event.host.firstName} {event.host.lastName}</li>
                        <h4 style={{ marginBottom: '0.1rem' }}>Guest List:</h4>
                    </ul>
                    {event.guests.map(guest => (
                        <ul key={guest} style={{ listStyle: "none" }} >
                            <li style={{ margin: '0.5rem' }}>Email: {guest}</li>
                        </ul>
                    ))}
                    <h4 style={{ marginBottom: '0.1rem' }}>Dishes List:</h4>

                    {event.dishes.map(dish => (

                        <ul key={dish._id} style={{ listStyle: "none" }}>
                            {dish.dishType && (

                                <li style={{
                                    display: "flex", justifyContent: "space-around", width: "15vw"
                                }}><span>{dish.dishType}</span><button>SignUp</button><span>Provider:</span></li>
                            )}

                        </ul>
                    ))
                    }

                    <button style={{ margin: '1rem' }}>Update form</button>
                </>
            )}
        </>

    )
}

export default Event;


