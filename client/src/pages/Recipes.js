import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Recipe from '../components/Recipe';
import SearchForm from '../components/SearchForm';
import Auth from '../utils/auth';
require('dotenv').config();


const Recipes = () => {
    // store submitted search term for api fetch
    const [searchTerm, setSearchterm] = useState('nachos');
    // store searched term from input field
    const [search, setSearch] = useState('');

    // updating state of search value entered in input field
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // passing the final search value state once search button is clicked
    // clearing the input field after submitting
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchterm(search);
        setSearch('');
    }

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&from=0&to=6`);
        const data = await response.json();
        setRecipes(data.hits);
    }

    // storing api response in state 
    const [recipes, setRecipes] = useState([]);
    // triggering re-render when search term is changing
    useEffect(() => {
        getRecipes();
    }, [searchTerm]);

    // check if user is loggedin or direct to landing page
    if (!Auth.loggedIn()) {
        return (<Redirect to='/' />)
    };

    return (
        <div className="recipesbackground">
            <div className="title-container">
                <h1 className="recipestitle">Inspiration</h1>
            </div>
            <div>
                < SearchForm class='recipes-form' onSearch={handleSearch} search={search} onSubmit={handleSubmit} />
                <div className='recipes-container'>
                    {recipes.map(recipe => (
                        // rendering each recipe with component
                        < Recipe
                            image={recipe.recipe.image}
                            url={recipe.recipe.url}
                            label={recipe.recipe.label}
                            key={recipe.recipe.uri} />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Recipes;