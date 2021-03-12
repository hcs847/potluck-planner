import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <nav class="navbar navbar-light navbar-dark imageWrapper">
            <ul style={{ listStyle: 'none', display: "flex", gap: "1rem" }}>
                <Link to='/home'>
                    <li>Home</li>
                </Link>
                <Link to='/potluck'>
                    <li>Potluck Plannning</li>
                </Link>
                <Link to='/recipes'>
                    <li>Recipes</li>
                </Link>
                <li>Logout</li>
            </ul>
        </nav>
    )
}

export default Nav;