import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Auth from '../utils/auth';

const Landing = () => {

    // redirect to home page if user is logged-in
    if (Auth.loggedIn()) {
        return <Redirect to='/home' />
    }

    return (
        <>
            <div className="landing-page flex-around">
                <div className="landing-font flex-col">
                    <h3>Say Hello To Your New</h3>
                    <h1>Potluck Planner</h1>
                    <h2>Let's Start Cooking</h2>
                </div>
                <Login />
            </div>
        </>
    )
}

export default Landing;