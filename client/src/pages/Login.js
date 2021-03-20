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
            <div className="login-join-background flex-col">
                <h2>Sign In</h2>
                <form className="form-center flex-col" onSubmit={handleFormSubmit}>
                    <div className='login-join-field'>
                        <label htmlFor="email">Email: </label>
                        <input
                            placeholder='youremail@email.com'
                            name='email'
                            type='email'
                            id='email'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='login-join-field'>
                        <label htmlFor="pwd">Password:</label>
                        <input
                            placeholder='******'
                            name='password'
                            type='password'
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
                        <button className='btn blue-background' type='submit'>Sign In</button>
                    </div>
                </form>
                <br />
                <div className='login-switch'>
                    New to Potluck Planner?
                <Link to='/signup'> Join Now</Link>
                </div>
            </div>
        </>
    )
}

export default Login;