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
        <div className='home-image'>

            <EventForm />
        </div>
    )
}

export default PlanEvent
