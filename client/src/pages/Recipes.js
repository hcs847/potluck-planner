import React, { useState, useEffect } from 'react';
import Recipe from '../components/Recipe';
import SearchForm from '../components/SearchForm';
require('dotenv').config();

const Recipes = () => {
    // store submitted search term for api fetch
    const [searchTerm, setSearchterm] = useState('nachos');
    // store searched term from input field
    const [search, setSearch] = useState('');

    // storing the search value entered in input field
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // passing the final search value once search is clicked
    // clearing the input field after submitting
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchterm(search);
        setSearch('');
    }


    const [recipes, setRecipes] = useState([]);
    // render when search term is changing
    useEffect(() => {
        getRecipes();
        // console.log(searchTerm);
    }, [searchTerm]);


    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&from=0&to=6`);
        const data = await response.json();
        // console.log(recipes.hits[0].recipe.image);
        setRecipes(data.hits);

    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Inspiration</h1>
            < SearchForm style={{ margin: '0 auto' }} onSearch={handleSearch} search={search} onSubmit={handleSubmit} />
            <div style={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', maxWidth: '75vw', margin: '0 auto' }}>
                {recipes.map(recipe => (
                    < Recipe
                        image={recipe.recipe.image}
                        url={recipe.recipe.url}
                        label={recipe.recipe.label}
                        key={recipe.recipe.uri} />
                ))
                }
            </div>
        </>
    )
}

export default Recipes;