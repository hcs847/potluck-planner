import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_EVENT, ADD_DISH } from '../../utils/mutations';
import DishForm from '../DishForm';
import BasicEventForm from '../BasicEventForm';
import { QUERY_EVENT } from '../../utils/queries';

const EventForm = () => {
    // Dishes array input fields
    const [dishInputFields, setDishInputFields] = useState([{
        id: 0,
        dishName: ''
    }]);

    const [dishsName, setDishsName] = useState('');

    const addDishInput = (e) => {
        e.preventDefault();
        setDishInputFields([
            ...dishInputFields,
            {
                id: dishInputFields.length,
                dishName: dishsName
            }
        ]);
        console.log("dishInputFields", dishInputFields);
        //  update form state with dishes array
        // setBasicEventState({
        //     ...basicEventState,
        //     dishes: [...dishInputFields]
        // }
        // )

    }

    // event id for update form
    const { _id: id } = useParams();
    const { data } = useQuery(QUERY_EVENT, {
        variables: { _id: id }
    })

    // fetch single event from db once available
    const singleEvent = data?.event || '';
    console.log("singleEvent: ", singleEvent);

    // addEvent function from graphql mutations functions
    const [addEvent, { error }] = useMutation(ADD_EVENT);

    // add a dish to an existing event
    const [addDish, { dishError }] = useMutation(ADD_DISH);

    // store created event id
    const [eventId, setEventId] = useState('');

    // handling state for input of Event form fields
    const [basicEventState, setBasicEventState] = useState({
        eventName: '',
        message: '',
        date: '',
        time: '',
        location: '',
        dishes: [dishInputFields]
    });

    // handling state for dishes
    const [dishState, setDishState] = useState({
        dishName: ''
        // ,
        // dishType: ''
    });

    // handling state for the whole event
    const [eventState, setEventState] = useState({
        ...basicEventState,
        ...dishState
    });

    // handling change for basic fields within form
    const handleChangeEventForm = (e) => {
        const { name, value } = e.target;
        setBasicEventState({
            ...basicEventState,
            [name]: value
        })

    };

    const handleSubmitEventForm = async event => {
        event.preventDefault();

        try {
            const { data } = await addEvent({
                variables: { ...basicEventState }
            });

            // retrieving id of created event
            setEventId(data.addEvent._id);

        } catch (e) {
            console.error(e);
        }
    }

    // handling change for Dishes within form
    const handleChangeDishForm = (e) => {
        const { name, value } = e.target;
        setDishState({
            ...dishState,
            [name]: value
        });
        // console.log("dishState:", dishState)
    };

    // dish form submit
    const handleSubmitDishForm = async e => {
        e.preventDefault();

        try {
            const { data } = await addDish({
                variables: { eventId, ...dishInputFields }
            });

            console.log("addDish: data ", data);

        } catch (err) {
            console.error(err);
        }
    }

    // extract event details when eventId is available in useParams
    useEffect(() => {
        if (id) {
            setEventState(singleEvent)
        }
        console.log(eventState);
    }, [singleEvent]);

    return (
        <>
            {/* if there's no eventId yet, display basic details of event form */}
            {
                !eventId && !id && (
                    <form onSubmit={handleSubmitEventForm}>
                        <BasicEventForm handleChange={handleChangeEventForm} basicEvent={basicEventState} />


                        <button style={{ fontWeight: '700' }}
                            type="submit"
                        >
                            Next
                    </button>

                        {error && <span>Something went wrong...</span>}
                        <br />
                    </form>
                )
            }
            {
                eventId && (
                    <form onSubmit={handleSubmitDishForm}>
                        <DishForm onBlurDish={addDishInput} handleChange={handleChangeEventForm} dishsName={dishsName} setDishName={setDishsName} dishes={dishInputFields} />
                        <button
                            type="submit"
                        >
                            Update dish/ add another dish
                </button>
                    </form>
                )
            }
            {dishError && <span>Something went wrong...</span>}
            <br />

            {
                eventId && (
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
                )
            }
            <br />
            {
                eventId && (
                    <Link to={`/event/${eventId}`}>
                        <button style={{ color: "navy", fontWeight: '700', fontSize: "1rem", width: "16vw", margin: "0.5rem" }}>
                            Review Event
                </button>
                    </Link>
                )
            }
            {/* Change Event Form */}
            {
                id && (
                    <>

                        <form>
                            <h3>Update your event</h3>
                            <BasicEventForm handleChange={handleChangeEventForm} basicEvent={eventState} />
                            {/* <DishForm handleChange={handleChangeDishForm} handleSubmit={handleSubmitDishForm} dishes={singleEvent.dishes} /> */}
                            <DishForm onBlurDish={addDishInput} handleChange={handleChangeEventForm} dishsName={dishsName} setDishName={setDishsName} dishes={dishInputFields} />
                            <br />
                            <br />
                            <button>Submit Changes</button>
                        </form>
                    </>

                )
            }
        </>
    )
}

export default EventForm;
