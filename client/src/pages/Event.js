import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';


const Event = () => {
    const [state, dispatch] = useGlobalContext();
    const { events } = state;

    const { _id: id } = useParams();

    const singleEvent = () => {
        return events.filter(event => event._id === parseInt(id))
    }

    console.log("id: ", typeof (id), id, singleEvent());

    return (
        <div>

            {singleEvent().map(event => (
                // {events.map(event => (
                <ul key={event._id} style={{ listStyle: "none" }}>
                    <li style={{ fontWeight: "bolder" }}>{event.eventName}</li>
                    <li>{event.guests.firstName}</li>
                    <li>{event.date}</li>
                    <li>{event.time}</li>
                    <li>{event.location}</li>
                    <li><h4 style={{ marginBottom: '0.2rem' }}>Guest List:</h4>{event.guests.map(guest => (
                        <li style={{ margin: '0.5rem' }} key={guest.guestId}>Name: {guest.guestName}</li>
                    )
                    )}</li>
                    <li><h4 style={{ marginBottom: '0.2rem' }}>Dishes List:</h4>{event.dishes.map(dish => (
                        <li style={{ margin: '0.5rem' }} key={dish.dishId}>{dish.dishType} <button>SignUp</button></li>
                    ))}</li>
                </ul>
            ))}


        </div>
    )
}

export default Event;


