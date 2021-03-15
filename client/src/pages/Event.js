import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENT } from '../utils/queries';



const Event = () => {

    const { eventId: eventId } = useParams();
    const { data } = useQuery(QUERY_EVENT, {
        variables: { eventId: eventId }
    });

    const event = data?.event || '';


    // const singleEvent = () => {
    //     return events.filter(event => event._id === eventId)
    // }

    console.log("id: ", eventId, "event", event, data);

    return (
        <>
            {/* {singleEvent.map(event => ( */}
            <ul style={{ listStyle: "none" }}>
                <li style={{ fontWeight: "bolder" }}>{event.eventName}</li>
                {/* <li>{event.guests.firstName}</li> */}
                <li>{event.date}</li>
                <li>{event.time}</li>
                <li>{event.location}</li>
                {/* <li>{event.host.firstName}</li> */}
                <h4 style={{ marginBottom: '0.1rem' }}>Guest List:</h4>
                {/* {event.guests.map(guest => (
                    <ul key={guest.email} style={{ listStyle: "none" }} >
                        <li style={{ margin: '0.5rem' }} key={guest.guestId}>Name: {guest.guestName}</li>
                    </ul>
                ))} */}
                <h4 style={{ marginBottom: '0.1rem' }}>Dishes List:</h4>
                {/* {event.dishes.map(dish => (
                    <ul key={dish.dishName} style={{ listStyle: "none" }}>
                        <li style={{ margin: '0.5rem' }} key={dish.dishId}>{dish.dishName} <button>SignUp</button></li>
                    </ul>
                ))} */}
            </ul>

            {/* )} */}

            <button style={{ margin: '1rem' }}>Update form</button>


        </>
    )
}

export default Event;


