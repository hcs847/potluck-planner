import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ADD_EVENT, ADD_DISH } from '../../utils/mutations';
import DishForm from '../DishForm';



const EventForm = () => {
    // addEvent function from graphql mutations functions
    const [addEvent, { error }] = useMutation(ADD_EVENT);

    // add a dish to an existing event
    const [addDish, { dishError }] = useMutation(ADD_DISH);

    // store created event id
    const [eventId, setEventId] = useState('');

    // handling state for basic details on Event form
    const [eventState, setEventState] = useState({
        eventName: '', message: '', date: '', time: '', location: ''
    });

    // handling change for other fields within form
    const handleChangeEventForm = (event) => {
        const { name, value } = event.target;
        setEventState({
            ...eventState,
            [name]: value
        })
    };

    const handleSubmitEventForm = async event => {
        event.preventDefault();

        try {
            const { data } = await addEvent({
                variables: { ...eventState }
            });

            // retrieving id of created event
            setEventId(data.addEvent._id);

        } catch (e) {
            console.error(e);
        }
    }

    const [dishState, setDishState] = useState({
        dishName: ''
        // ,
        // dishType: ''
    });


    // handling change for Dishes within form
    const handleChangeDishForm = (event) => {
        const { name, value } = event.target;
        setDishState({
            ...dishState,
            [name]: value
        });
        // console.log("dishState:", dishState)
    };

    // dish form submit
    const handleSubmitDishForm = async event => {
        event.preventDefault();

        try {
            const { data } = await addDish({
                variables: { eventId, ...dishState }
            });

            console.log("addDish: data ", data);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="potluckbackground">
                <div className="potluckorange">
                    <form onSubmit={handleSubmitEventForm}>
                        <div>
                            <label className="potluckform" htmlFor="eventName">Event Name:</label>
                            <input className="forminput"
                                placeholder="Name Your Event"
                                name="eventName"
                                type="text"
                                id="eventName"
                                onChange={handleChangeEventForm}
                            />
                        </div>
                        <br />
                        <div>
                            <label className="potluckform" htmlFor="message">Welcome Message for Guests: </label>
                            <textarea className="forminput"
                                placeholder="Leave a Message for Your Guests:"
                                name="message"
                                type="text"
                                id="message"
                                onChange={handleChangeEventForm}
                            />
                        </div>
                        <br />
                        <div>
                            <label className="potluckform" htmlFor="date">Event date: </label>
                            <input className="forminput"
                                placeholder="Event's Date"
                                name="date"
                                type="date"
                                id="date"
                                onChange={handleChangeEventForm}
                            />
                        </div>
                        <br />
                        <div>
                            <label className="potluckform" htmlFor="time">Time: </label>
                            <input className="forminput"
                                placeholder="Event's Time"
                                name="time"
                                type="time"
                                id="time"
                                onChange={handleChangeEventForm}
                            />
                        </div>
                        <br />
                        <div>
                            <label className="potluckform" htmlFor="location">Location: </label>
                            <input className="forminput"
                                placeholder="Enter the Location"
                                name="location"
                                type="text"
                                id="location"
                                onChange={handleChangeEventForm}
                            />
                        </div>
                        <br />
                        {!eventId && (
                            <button style={{ fontWeight: '700' }}
                                type="submit"
                            >
                                Next
                            </button>
                        )}
                        {error && <span>Something went wrong...</span>}
                        <br />
                    </form>


                    {eventId && (
                        <DishForm handleChange={handleChangeDishForm} handleSubmit={handleSubmitDishForm} dish={dishState} />

                    )}
                    {dishError && <span>Something went wrong...</span>}
                    <br />

                    {eventId && (
                        <form>
                            <label htmlFor="guestName">Guest Name:</label>
                            <input
                                placeholder="Guest name"
                                name="guestName"
                                type="name"
                            />
                            <label htmlFor="guestEmail">Guest Email:</label>
                            <input
                                placeholder="Guest Email"
                                name="guestEmail"
                                type="email"
                            />

                            <button
                                type="submit">
                                Update Guest/add another guest
                        </button>
                        </form>
                    )}
                    <br />
                    {eventId && (
                        <Link to={`/event/${eventId}`}>
                            <button style={{ color: "navy", fontWeight: '700', fontSize: "1rem", width: "16vw", margin: "0.5rem" }}>
                                Review Event
                </button>
                        </Link>
                    )}

                </div>
            </div>
        </>
    )
}

export default EventForm;
