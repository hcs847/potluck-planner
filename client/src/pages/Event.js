import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENTS } from '../utils/queries';


const Event = () => {

    const { data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];

    const { _id: id } = useParams();

    const singleEvent = () => {
        return events.filter(event => event._id === id)
    }

    console.log("id: ", typeof (id), id, singleEvent());

    return (
        <div>
            {singleEvent().map(event => (
                <ul key={event._id} style={{ listStyle: "none" }}>
                    <li style={{ fontWeight: "bolder" }}>{event.eventName}</li>
                    <li>{event.guests.firstName}</li>
                    <li>{event.date}</li>
                    <li>{event.time}</li>
                    <li>{event.location}</li>
                    <li>{event.host.firstName}</li>
                    <h4 style={{ marginBottom: '0.1rem' }}>Guest List:</h4>
                    {event.guests.map(guest => (
                        <ul key={guest.email} style={{ listStyle: "none" }} >
                            <li style={{ margin: '0.5rem' }} key={guest.guestId}>Name: {guest.guestName}</li>
                        </ul>
                    ))}
                    <h4 style={{ marginBottom: '0.1rem' }}>Dishes List:</h4>
                    {event.dishes.map(dish => (
                        <ul key={dish.dishName} style={{ listStyle: "none" }}>
                            <li style={{ margin: '0.5rem' }} key={dish.dishId}>{dish.dishName} <button>SignUp</button></li>
                        </ul>
                    ))}
                </ul>
            ))}


        </div>
    )
}

export default Event;


