import React from 'react';

const Recipe = ({ image, url, label }) => {
    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            <p><a href={url} target="_blank" rel="noreferrer">{label}</a></p>
            <img style={{ maxWidth: '20vw' }} src={image} alt="" />
        </div>
    )
}

export default Recipe;