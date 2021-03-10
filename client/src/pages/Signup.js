import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    // add useMutation
    // ================ 

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // link to mutation
        // ================
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
            <h2>Signup</h2>
            <form onSubmit={handleFormSubmit}>
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
                    <label htmlFor="pwd">Passeord:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="text"
                        id="pwd"
                        onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Join</button>
                </div>
            </form>
            <div>
                Already on Potluck Planner? <Link to="/login"> Sign in</Link>
            </div>
        </>
    )
}


export default Signup;