import React from 'react';

const Recipe = ({ image, url, label }) => {
    return (

        <div className='recipe-img'>
            <p><a className='recipe-txt' href={url} target="_blank" rel="noreferrer">{label}</a></p>
            <img src={image} alt="" />
        </div>

    )
}

export default Recipe;