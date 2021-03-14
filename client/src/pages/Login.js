import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';


const Login = (event) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(name, value);
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
            const token = mutationResponse.data.login.token;
            Auth.login(token);
            // console.log("Loggedin");
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <>
            <h2>Sign in</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        placeholder='youremail@email.com'
                        name='email'
                        type='email'
                        id='email'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder='******'
                        name='password'
                        type='passwrod'
                        id='pwd'
                        onChange={handleChange}
                    />
                </div>
                {
                    error ? <div>
                        <p>The provided credentials are incorrect</p>
                    </div> : null

                }
                <div>
                    <button type='submit'>Sign in</button>
                </div>
            </form>
            <br />
            <div>
                New to Potluck Planner?
                <Link to='/signup'>Join Now</Link>
            </div>
        </>
    )
}

export default Login;