import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';
import Event from '../pages/Event';

const Home = () => {
    const [state, dispatch] = useGlobalContext();
    const { events } = state;
    console.log("events  :", events[0]);

    return (
        <>
            <h2>Your Events</h2>
            <ul style={{ listStyle: "none" }}>
                {events.map(event => (
                    <Link to={`/event/${event.eventId}`}>
                        <li style={{ textDecoration: "none", fontWeight: "bolder" }}>{event.eventName}</li>
                    </Link>

                    // < Event key={event.eventId} event={event} />

                ))}
            </ul>


        </>
    )
}

export default Home;
