import React from 'react';

const Recipe = ({ image, url, label }) => {
    return (
        <div>
        <div style={{ display: 'flex', flexDirection: "column" }}>
            <p><a href={url} target="_blank" rel="noreferrer">{label}</a></p>
            <img style={{ maxWidth: '20vw' }} src={image} alt="" />
        </div>
        </div>
    )
}

export default Recipe;