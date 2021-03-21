import React, { useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_EVENT } from '../utils/queries';
import { ASSIGN_DISH } from '../utils/mutations';
import Dish from '../components/Dish';
import Auth from '../utils/auth';


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

    // check if user is loggedin or redirect to landing page
    if (!Auth.loggedIn()) {
        return (<Redirect to='/' />)
    };

    return (
        <>
            {event && (
                <>
                    <div className="event-page">
                        {error && <span style={{ color: 'red' }}>Something went wrong...</span>}
                        <h2>{event.eventName}</h2>
                        <div className="event-container flex-col">
                            <ul className='event-details  flex-around'>
                                <li>Date:<h3> {event.date}</h3></li>
                                <li>Time:<h3 className='event-right'> {event.time}</h3></li>
                                <li>Location: <h3>{event.location}</h3></li>
                                <li>Hosted By: <h3 className='event-right'>{event.host.firstName} {event.host.lastName}</h3></li>
                            </ul>
                            <div className="event-message">
                                <p>{event.message}</p>
                            </div>
                            <div className="event-dish-table flex-col">
                                <div className="dish-title flex-around">
                                    <h4>Dishes To Share:</h4>
                                    <h4>Sign Up / Filled by</h4>
                                </div>
                                {event.dishes.map(dish => (
                                    <ul className='dish flex-between'>
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
                            </div>

                            <h4 >Guest List:</h4>
                            <ul className='guest-list flex-col' >
                                {event.guests.map(guest => (
                                    <li key={`guest${event.guests.indexOf(guest)}`}>Email: {guest}</li>
                                ))}
                            </ul>
                            <Link to={`/potluck/${eventId}`}>
                                <button className="event submitbutton">Update Event</button>
                            </Link>
                        </div>
                    </div>


                </>
            )}
        </>

    )
}

export default Event;


