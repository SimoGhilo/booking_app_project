import React from 'react';
import '../styles/searchBar.css';

const SearchBar = () => {
    return (
        <div className='bar'>
            <h2 className='subtitle'>Find your perfect stay...</h2>
            <div className='searchBar'>
                <div className='field'>
                    <input type='text' className='input' placeholder='Where to ?' />
                </div>
                <div className='field'>
                    <input type='date' className='input' placeholder='When ?' />
                </div>
                <div className='field'>
                    <input type='number' className='input' placeholder='Number of guests' />
                </div>
                <div className='field'>
                    <button>Search</button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;