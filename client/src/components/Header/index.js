import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Header() {

    // logout functionality
    const logout = e => {
        e.preventDefault();
        Auth.logout();
    };
    return (
        <div className="flex-col">
            <div className='header'>
                <h1>Potluck Planner</h1>
            </div>
            <nav className="nav flex-start">
                <>
                    {Auth.loggedIn() ? (
                        <>
                            <ul className="navlist flex">
                                <Link to='/home'>
                                    <li className="navlink">Home</li>
                                </Link>
                                <Link to='/potluck'>
                                    <li className="navlink">Potluck Planner</li>
                                </Link>
                                <Link to='/recipes'>
                                    <li className="navlink">Recipes</li>
                                </Link>
                            </ul>
                            <ul className="navlist logout-nav">
                                {/* there is not logout page for logout, removes jwt to not be logged in*/}
                                <li className="navlink"><a href="/" onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        </>
                    ) : (
                            <ul className="navlist flex">
                                <Link to='/login'>
                                    <li className="navlink">Login</li>
                                </Link>
                                <Link to='/signup'>
                                    <li className="navlink">Join</li>
                                </Link>
                            </ul>
                        )}
                </>
            </nav>
        </div>
    )
}

export default Header;
