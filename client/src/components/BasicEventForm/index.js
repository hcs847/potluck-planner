import React from 'react'

function BasicEventForm({ handleChange, basicEvent }) {
    return (
        <>
            <div>
                <label htmlFor="eventName">Event Name:</label>
                <input
                    placeholder="Event's name"
                    name="eventName"
                    type="text"
                    id="eventName"
                    value={basicEvent.eventName}
                    onChange={handleChange}
                />
            </div>
            <br />
            <div>
                <label htmlFor="message">Welcome message for guests</label>
                <textarea
                    placeholder="Welcome message:"
                    name="message"
                    type="text"
                    id="message"
                    value={basicEvent.message}
                    onChange={handleChange}
                />
            </div>
            <br />
            <div>
                <label htmlFor="date">Event date:</label>
                <input
                    placeholder="Event's date"
                    name="date"
                    type="date"
                    id="date"
                    value={basicEvent.date}
                    onChange={handleChange}
                />
            </div>
            <br />
            <div>
                <label htmlFor="time">Time:</label>
                <input
                    placeholder="Event's time"
                    name="time"
                    type="time"
                    id="time"
                    value={basicEvent.time}
                    onChange={handleChange}
                />
            </div>
            <br />
            <div>
                <label htmlFor="location">Location:</label>
                <input
                    placeholder="Event's location"
                    name="location"
                    type="text"
                    id="location"
                    value={basicEvent.location}
                    onChange={handleChange}
                />
            </div>
            <br />
        </>
    )
}

export default BasicEventForm


