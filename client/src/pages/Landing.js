import React from 'react';
import Login from './Login';

const Landing = () => {

    return (
        <>
            <div className="flex-around">
                <div className="flex-col">
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