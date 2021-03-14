import React from 'react'
import { Link } from 'react-router-dom';


const Event = ({ event }) => {

    return (
        <div>
            <Link to={`/event/${event.eventId}`}>
                <li class="eventname" style={{ textDecoration: "none", fontWeight: "bolder" }}>{event.eventName}</li>
            </Link>

            <li >{event.date}</li>
            <li>{event.time}</li>
            <li>{event.location}</li>
            <li><h4 style={{ marginBottom: '0.2rem' }}>Guest List:</h4>{event.guests.map(guest => (
                <li style={{ margin: '0.5rem' }} key={guest.guestId}>Name: {guest.guestName}</li>
            )
            )}</li>
            <li><h4 style={{ marginBottom: '0.2rem' }}>Dishes List:</h4>{event.dishes.map(dish => (
                <li style={{ margin: '0.5rem' }} key={dish.dishId}>{dish.dishType} <button class="btn">Sign Up</button></li>
            )

            )}</li>

        </div>
    )
}

export default Event


