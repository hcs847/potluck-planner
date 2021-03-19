import React from 'react';

const SearchForm = ({ onSearch, onSubmit, search }) => {

    return (
        <div style={{ textAlign: 'center' }}>
            <form className="search-form" onSubmit={onSubmit}>
                <input type='text' value={search} onChange={onSearch} />
                <button className='submitbutton' type='submit' >
                    Search
           </button>
            </form>
        </div>
    )
}

export default SearchForm;
