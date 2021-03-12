import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENTS } from '../utils/queries';


const Home = () => {
    const { loading, data: events } = useQuery(QUERY_EVENTS);
    const [state, dispatch] = useGlobalContext();
    const { events } = state;
    console.log("events  :", events[0]);

    return (
        <>
            <h2>Your Events</h2>
            <ul style={{ listStyle: "none" }}>
                {events.map(event => (
                    <Link key={event._id} to={`/event/${event._id}`}>
                        <li style={{ textDecoration: "none", fontWeight: "bolder" }}>{event.eventName}</li>
                    </Link>

                ))}
            </ul>


        </>
    )
}

export default Home;
