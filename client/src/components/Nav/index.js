import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to='/Home'>
                    <li>Home</li>
                </Link>
                <Link to='/Potlucks'>
                    <li>Potlucks</li>
                </Link>
                <Link to='/Recipes'>
                    <li>Recipes</li>
                </Link>
                <li>Logout</li>
            </ul>
        </nav>
    )
}

export default Nav;