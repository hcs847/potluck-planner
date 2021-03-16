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

                <li style={{
                    display: "flex", justifyContent: "space-around", width: "33vw"
                }}><span>{dish.dishType}</span>
                    {!dish.provider && !toggleSignup && (
                        <button onClick={handleSignupState}>SignUp</button>
                    )}
                    {/* after clicking on signup, form to enter dish to bring */}
                    {toggleSignup && !dish.dishName && (
                        <form onSubmit={(e) => submitDish(e, dish._id)} >
                            <label htmlFor="dishAssignment">What dish would you like to bring?</label>
                            <input
                                type="text"
                                value={dishToBring}
                                onChange={changeDish} />
                            <button
                                type='submit'>Add Dish</button>
                        </form>
                    )}
                    <span>Dish Name: {dish.dishName}</span>
                    <span>Provider: {userId ? dishProvider.firstName : ''}</span>

                </li>
            )}

        </>
    )
}

export default Dish
