import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <nav class="navbar">
            <ul class="navlist" style={{ listStyle: 'none', display: "flex", gap: "1rem" }}>
                <Link to='/home'>
                    <li class="navlink">Home</li>
                </Link>
                <Link to='/potluck'>
                    <li class="navlink">Potluck Planner</li>
                </Link>
                <Link to='/recipes'>
                    <li class="navlink">Recipes</li>
                </Link>
                <li class="navlink">Logout</li>
            </ul>
        </nav>
    )
}

export default Nav;