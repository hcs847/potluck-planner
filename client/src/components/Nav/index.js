import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
<<<<<<< HEAD
        <nav className="navbar navbar-light navbar-dark imageWrapper">
=======
        <nav className="navbar">
>>>>>>> 5fb9a9f066cf76f5f3ff943f9f6fc8179cd5fef6
            <ul className="navlist" style={{ listStyle: 'none', display: "flex", gap: "1rem" }}>
                <Link to='/home'>
                    <li className="navlink">Home</li>
                </Link>
                <Link to='/potluck'>
                    <li className="navlink">Potluck Planner</li>
                </Link>
                <Link to='/recipes'>
                    <li className="navlink">Recipes</li>
                </Link>
                <li className="navlink">Logout</li>
            </ul>
        </nav>
    )
}

export default Nav;