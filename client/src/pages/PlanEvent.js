import React from 'react';
import { Redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';
import Auth from '../utils/auth';



function PlanEvent() {
    // check if user is loggedin or direct to landing page
    if (!Auth.loggedIn()) {
        return (<Redirect to='/' />)
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            <EventForm />
        </div>
    )
}

export default PlanEvent
