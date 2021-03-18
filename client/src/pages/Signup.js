import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });

    // useMutation hook plus destructuring error to alret user of issues
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }

    }

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <>
            <div className='login-join-background flex-col'>
                <h2>Signup</h2>
                <form className='form-center' onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            placeholder="First"
                            name="firstName"
                            type="text"
                            id="firstName"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            placeholder="Last"
                            name="lastName"
                            type="text"
                            id="lastName"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder="youremail@email.com"
                            name="email"
                            type="text"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="pwd">Password:</label>
                        <input
                            placeholder="******"
                            name="password"
                            type="text"
                            id="pwd"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <button className='submitbutton' type="submit">Join</button>
                    </div>
                </form>
                <div>
                    Already on Potluck Planner? <Link to="/login"> Sign in</Link>
                </div>
            </div>
        </>
    )
}


export default Signup;