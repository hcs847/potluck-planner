import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
<<<<<<< HEAD
        <nav className="navbar navbar-light navbar-dark imageWrapper">
            <ul className="navlist" style={{ listStyle: 'none', display: "flex", gap: "1rem" }}>
=======
        <nav class="navbar">
            <ul class="navlist" style={{ listStyle: 'none', display: "flex", gap: "1rem" }}>
>>>>>>> d9aa52c3ae19fd1c8d6d662d482bcb21b4f331d7
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