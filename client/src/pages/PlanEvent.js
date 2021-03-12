import React from 'react';
import EventForm from '../components/EventForm';

function PlanEvent() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Plan an Event</h2>
            <EventForm />
        </div>
    )
}

export default PlanEvent
