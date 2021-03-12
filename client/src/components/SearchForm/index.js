import React from 'react';

const SearchForm = ({ onSearch, onSubmit, search }) => {

    return (
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={onSubmit} style={{ margin: '0 auto' }}>
                <input type='text' value={search} onChange={onSearch} />
                <button type='submit' >
                    Search
           </button>
            </form>
        </div>
    )
}

export default SearchForm;
