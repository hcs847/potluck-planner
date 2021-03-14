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
        <div class="eventbackground">
        <div class="eventorange">
            <h2>Your Events</h2>
            <ul class="eventlist" style={{ listStyle: "none" }}>
                {events.map(event => (

                    < Event key={event.eventId} event={event} />

                ))}
            </ul>
            </div>
        </div>


        </>
    )
}

export default Home;
