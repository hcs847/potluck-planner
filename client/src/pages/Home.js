import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
    const { data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];

    if (!events?.length) {
        return <h3>There are no Upcoming Events.</h3>
    }

    return (
        <>
            <div className="eventbackground">
                <div className="eventorange">
                    <h2>Your Events</h2>
                    <ul className="eventlist" style={{ listStyle: "none" }}>
                        {events.map(event => (
                            <Link key={event._id} to={`/event/${event._id}`}>
                                <li style={{ textDecoration: "none", fontWeight: "bolder" }}>{event.eventName}</li>
                            </Link>

                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;
