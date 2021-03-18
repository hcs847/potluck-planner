import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENTS } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
    const { data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];

    // check if user is loggedin or redirect to landing page
    if (!Auth.loggedIn()) {
        return (<Redirect to='/' />)
    };

    if (!events?.length) {
        return <h3>There are no Upcoming Events.</h3>
    };

    return (
        <>
            {/* <div className="eventbackground"> */}

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

        </>
    )
}

export default Home;
