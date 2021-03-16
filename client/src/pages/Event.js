import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_EVENT } from '../utils/queries';
import { ASSIGN_DISH } from '../utils/mutations';
import Dish from '../components/Dish';

const Event = () => {
    //  destructuring variable defined in route path 
    const { eventId } = useParams();
    const { data } = useQuery(QUERY_EVENT, {
        variables: { eventId }
    });

    const event = data?.event || '';

    // enabling users to signup for a dish
    const [updateDish, { error }] = useMutation(ASSIGN_DISH);

    // signup Dish state
    const [dishAssignment, setDishAssignment] = useState("");

    const handleChangeDish = (e) => {
        setDishAssignment(e.target.value);
        // console.log(e.target.value);
    }

    const handleSubmitAssignDishForm = async (e, dishId) => {
        e.preventDefault();
        setDishAssignment(e.target.value);
        // console.log("dishid:  ", dishId, "assignment:  ", dishAssignment);

        try {
            await updateDish({
                variables: { dishId: dishId, dishName: dishAssignment, }
            });
            setDishAssignment('');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            {event && (
                <>
                    {error && <span style={{ color: 'red' }}>Something went wrong...</span>}
                    <ul style={{ listStyle: "none" }}>
                        <li style={{ fontWeight: "bolder" }}>{event.eventName}</li>

                        <li>{event.date}</li>
                        <li>{event.time}</li>
                        <li>{event.location}</li>
                        <li>Hosted By: {event.host.firstName} {event.host.lastName}</li>
                        <h4 style={{ marginBottom: '0.1rem' }}>Guest List:</h4>
                    </ul>
                    <ul style={{ listStyle: "none" }} >
                        {event.guests.map(guest => (
                            <li key={`guest${event.guests.indexOf(guest)}`} style={{ margin: '0.5rem' }}>Email: {guest}</li>
                        ))}
                    </ul>
                    <h4 style={{ marginBottom: '0.1rem' }}>Dishes List:</h4>

                    {event.dishes.map(dish => (

                        <ul style={{ listStyle: "none" }}>
                            <Dish
                                dish={dish}
                                submitDish={handleSubmitAssignDishForm}
                                changeDish={handleChangeDish}
                                dishToBring={dishAssignment}
                                key={dish._id}
                            />
                        </ul>
                    ))
                    }

                    <button style={{ margin: '1rem' }}>Update form</button>
                </>
            )}
        </>

    )
}

export default Event;


