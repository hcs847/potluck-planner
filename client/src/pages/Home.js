import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENTS } from '../utils/queries';
import { UPDATE_EVENTS } from '../utils/actions';


const Home = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);
    const [state, dispatch] = useGlobalContext();
    // const { events } = state;
    // console.log("events  :", events);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_EVENTS,
                events: data.events
            })
        }
    }, [data, loading, dispatch]);

    const events = state?.events || [];

    if (!events?.length) {
        return <h3>There are no Upcoming Events.</h3>
    }


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
