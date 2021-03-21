import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../../utils/queries';

function Dish({ dish, submitDish, changeDish, dishToBring }) {
    const userId = dish.provider;
    const { data } = useQuery(QUERY_USER, {
        variables: { userId }
    });

    const dishProvider = data?.user || '';

    const [toggleSignup, setToggleSignup] = useState(false);

    const handleSignupState = () => {
        setToggleSignup(!toggleSignup);
    }


    return (
        <>
            {dish.dishType && (

                <li className='dish flex-around'><span className='dish-type'>{dish.dishType}</span>
                    {!dish.provider && !toggleSignup && (
                        <button className='btn' onClick={handleSignupState}>SignUp</button>
                    )}
                    {/* after clicking on signup, form to enter dish to bring */}
                    {toggleSignup && !dish.dishName && (
                        <form onSubmit={(e) => submitDish(e, dish._id)} >
                            <label htmlFor="dishAssignment">What dish would you like to bring?</label>
                            <input
                                type="text"
                                value={dishToBring}
                                onChange={changeDish} />
                            <button className='btn'
                                type='submit'>Add Dish</button>
                        </form>
                    )}
                    <div className="dish-signed flex-around">
                        <span className='event-tags'>Dish Name: </span><p>{dish.dishName}</p>
                        <span className='event-tags'>Provider: </span><p>{userId ? dishProvider.firstName : ''}</p>
                    </div>
                </li>
            )}

        </>
    )
}

export default Dish
