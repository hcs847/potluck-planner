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
        return <h3>There are no upcoming events.</h3>
    };

    return (
        <>
            {/* <div className="eventbackground"> */}

            <div className="events-container">
                <div className="title-container">
                    <div className="events-title">
                        <h2>Your Events</h2>
                    </div>
                </div>

                <ul className="eventlist">
                    {events.map(event => (
                        <Link key={event._id} to={`/event/${event._id}`}>
                            <li className="event-item"><span className='event-date'>
                                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })}
                            </span>
                                <span className='event-name'>
                                    {event.eventName}
                                </span>
                            </li>
                        </Link>

                    ))}
                </ul>
            </div>

        </>
    )
}

export default Home;
