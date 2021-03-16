import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_EVENT, DELETE_EVENT } from '../../utils/mutations';
import { QUERY_EVENT } from '../../utils/queries';

const EventForm = () => {
    // event id for update form option 
    const { eventId: id } = useParams();
    const { data } = useQuery(QUERY_EVENT, {
        variables: { eventId: id }
    })

    // fetch single event from db once available
    const singleEvent = data?.event || '';
    // console.log("singleEvent: ", singleEvent);

    // addEvent function from graphql mutations functions
    const [addEvent, { error }] = useMutation(ADD_EVENT);

    // delet event mutation 
    const [deleteEvent, { error: deleteError }] = useMutation(DELETE_EVENT);

    // state for dynamic input fields for dishes and guests arrays
    const dishObj = {
        dishType: ""
    };
    const [dishInputFields, setDishInputFields] = useState([dishObj]);
    const [guestInputFields, setGuestInputFields] = useState([""]);

    // handling state for input of Event form fields
    const [eventState, setEventState] = useState({
        eventName: '',
        message: '',
        date: '',
        time: '',
        location: '',
        dishes: dishInputFields || [dishObj],
        guests: guestInputFields || [""]
    });

    // dynamic redndering of input fields for guests and dishes
    const handleChangeInputFields = (id, e, inputFields, setFieldState, array) => {
        const newInputFields = inputFields.map(field => {
            // console.log("id", id, "field.id", field.id, "field", field, "inputFields", inputFields)
            if (id === inputFields.indexOf(field)) {
                field[e.target.name] = e.target.value
            }
            return field;
        })
        setFieldState([...newInputFields]);
        // updating the state of the whole form
        setEventState({
            ...eventState,
            [array]: [...newInputFields]
        });

    };

    // dynamically adding new input fields for dishes 
    const handleAddInputFields = (e, setFieldState, inputFields, key) => {
        e.preventDefault();
        setFieldState([...inputFields, {
            [key]: ''
        }])
    }

    // dynamically adding new input fields for guests
    const handleAddGuestInputFields = (e) => {
        e.preventDefault();
        setGuestInputFields([e.target.value, ...guestInputFields]);
    }

    const handleChangeGuestInputFields = (id, e) => {
        const newGuestInputfields = guestInputFields.map(guest => {
            console.log("new guests", id, guestInputFields.indexOf(guest));
            if (id === guestInputFields.indexOf(guest)) {
                return e.target.value;
            }
            return guest;
        })
        setGuestInputFields([...newGuestInputfields]);
        // updating the state of the whole form
        setEventState({
            ...eventState,
            guests: [...newGuestInputfields]
        });
    }

    // dynamically removing guests/dishes input fields
    const handleRemoveInputFields = (id, setInputFields, inputFields) => {
        const newInputFields = inputFields.filter(inputField => inputFields.indexOf(inputField) !== id);
        setInputFields([...newInputFields]);
        console.log(newInputFields);
    }



    // handling change for basic fields within form
    const handleChangeEventForm = (e) => {
        const { name, value } = e.target;
        setEventState({
            ...eventState,
            [name]: value
        })
    };

    // store in state created event id once form is submitted
    const [eventId, setEventId] = useState('');

    const handleSubmitEventForm = async e => {
        e.preventDefault();

        try {
            const { data } = await addEvent({
                variables: { ...eventState }
            });

            // retrieving id of created event from the event query
            setEventId(data.addEvent._id);
            // clearing form inputs
            setDishInputFields([{
                dishType: ''
            }]);
            setGuestInputFields([""]);
            setEventState([
                {
                    eventName: '',
                    message: '',
                    date: '',
                    time: '',
                    location: '',
                    dishes: dishInputFields,
                    guests: guestInputFields
                }
            ]);
            console.log("data, event.state when submitting", data, eventState);

        } catch (err) {
            console.error(err);
        }
    };

    // delete an event
    const handleDeleteEvent = async e => {
        e.preventDefault();
        try {
            await deleteEvent({
                variables: { eventId: id }
            });
            //    Redirect to homepage
            setTimeout(() => { window.location.assign('/potluck') }, 2000);

        } catch (err) {
            console.error(err);
        }
    }

    // extract event details when eventId is available in useParams
    useEffect(() => {
        if (id) {
            setDishInputFields(singleEvent.dishes);
            setGuestInputFields(singleEvent.guests);
            setEventState(singleEvent);
        }
        console.log(singleEvent, dishInputFields, guestInputFields);
    }, [singleEvent, id]);

    return (
        <div className="potluckbackground">
            {id ? (
                <h3 className="potlucktitle">Update your event</h3>
            ) : (
                    <h1 className="potlucktitle">Create a Potluck Event</h1>
                )
            }

            <div className="potluckorange">

                <form onSubmit={handleSubmitEventForm}>
                    {error && <span style={{ color: 'red' }}>Something went wrong...</span>}
                    <div>
                        <label className="potluckform" htmlFor="eventName">Event Name:</label>
                        <input
                            placeholder="Event's name"
                            name="eventName"
                            type="text"
                            value={eventState.eventName}
                            onChange={handleChangeEventForm}
                        />
                    </div>
                    <br />
                    <div>
                        <label className="potluckform" htmlFor="message">Welcome message for guests</label>
                        <textarea className="forminput"
                            placeholder="Welcome message:"
                            name="message"
                            type="text"
                            value={eventState.message}
                            onChange={handleChangeEventForm}
                        />
                    </div>
                    <br />
                    <div>
                        <label className="potluckform" htmlFor="date">Event date:</label>
                        <input className="forminput"
                            placeholder="Event's date"
                            name="date"
                            type="date"
                            value={eventState.date}
                            onChange={handleChangeEventForm}
                        />
                    </div>
                    <br />
                    <div>
                        <label className="potluckform" className="potluckform" htmlFor="time">Time:</label>
                        <input className="forminput"
                            placeholder="Event's time"
                            name="time"
                            type="time"
                            value={eventState.time}
                            onChange={handleChangeEventForm}
                        />
                    </div>
                    <br />
                    <div>
                        <label className="potluckform" htmlFor="location">Location:</label>
                        <input className="forminput"
                            placeholder="Event's location"
                            name="location"
                            type="text"
                            value={eventState.location}
                            onChange={handleChangeEventForm}
                        />
                    </div>
                    <br />
                    <p className="potluckformheader" style={{ fontWeight: '700' }}>Dishes to Share:</p>

                    {dishInputFields?.map((dishInputField, i) =>
                        (
                            <div key={`dish${i}${dishInputFields.indexOf(dishInputField)}`}>
                                <label className="potluckform" htmlFor="dishType">Dish Type:</label>
                                <input className="forminput"
                                    placeholder="Dish Type"
                                    name="dishType"
                                    type="text"
                                    value={dishInputField.dishType}
                                    onChange={(e) => handleChangeInputFields(i, e, dishInputFields, setDishInputFields, 'dishes')}
                                />
                                <button className="btn" className="btn" type="button" onClick={(e) => handleAddInputFields(e, setDishInputFields, dishInputFields, 'dishType')}>+ Add More Dishes</button>
                                <button className="btn" type="button" onClick={() => handleRemoveInputFields(i, setDishInputFields, dishInputFields)}>- Remove Dish</button>
                                <br />
                            </div>
                        )
                    )}

                    <p className="potluckformheader" style={{ fontWeight: '700' }}>Guests to Invite:</p>
                    {guestInputFields?.map((guestInputField, i) =>
                        (
                            <div key={`guest${i}${guestInputFields.indexOf(guestInputField)}`}>
                                <label className="potluckform" htmlFor="guestEmail">Guest Email:</label>
                                <input className="forminput"
                                    placeholder="Guest Email"
                                    name="guestEmail"
                                    type="email"
                                    value={guestInputField}
                                    onChange={(e) => handleChangeGuestInputFields(i, e)}
                                />
                                <button className="btn" type="button" onClick={(e) => { handleAddGuestInputFields(e) }}>+ Add More Guests</button>
                                <button className="btn" type="button" onClick={() => { handleRemoveInputFields(i, setGuestInputFields, guestInputFields) }}>- Remove Guest</button>
                                <br />
                            </div>
                        )
                    )}
                    <br />
                    {!id && (
                        <button className="submitbutton"
                            type="submit"
                        >
                            Create Event
                        </button>
                    )}

                    {/* Change to editing mode if event id is  in URL */}
                    {id && (
                        <button className="submitbutton">Submit Changes</button>
                    )}
                </form>

                {/* Enable Event deletion when event id is in url */}
                {id && (
                    <>
                        <br />
                        <button className="btn" style={{ width: "12vw" }} onClick={handleDeleteEvent}>Delete Event</button>
                        {deleteError && (
                            <span style={{ color: 'red' }}>Something went wrong...</span>
                        )}
                    </>
                )}

                {
                    eventId && (
                        <Link to={`/event/${eventId}`}>
                            <button className="btn" style={{ color: "navy", fontWeight: '700', fontSize: "1rem", width: "16vw", margin: "0.5rem" }}>
                                Review Event
                    </button>
                        </Link>
                    )
                }
            </div>
        </div >
    )
}

export default EventForm;
