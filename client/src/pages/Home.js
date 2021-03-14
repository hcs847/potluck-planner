import React from 'react';
import { Link } from 'react-router-dom';
// import { useGlobalContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EVENTS } from '../utils/queries';
// import { UPDATE_EVENTS } from '../utils/actions';


const Home = () => {
    const { data } = useQuery(QUERY_EVENTS);
    // const [state, dispatch] = useGlobalContext();
    // const { events } = state;
    // console.log("events  :", events);


    // useEffect(() => {
    //     if (data) {
    //         dispatch({
    //             type: UPDATE_EVENTS,
    //             events: data.events
    //         })
    //         console.log("Data:  ", data);
    //     }

    // }, [data, loading, dispatch]);

    const events = data?.events || [];

    if (!events?.length) {
        return <h3>There are no Upcoming Events.</h3>
    }


    return (
        <>
        <div class="eventbackground">
        <div class="eventorange">
            <h2>Your Events</h2>
            <ul class="eventlist" style={{ listStyle: "none" }}>
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
