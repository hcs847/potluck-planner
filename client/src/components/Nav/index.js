import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <nav className="navbar navbar-light navbar-dark imageWrapper">
            <h1>Potluck Planner</h1>
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