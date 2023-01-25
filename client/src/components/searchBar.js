import React, { useState } from 'react';
import '../styles/searchBar.css';

const SearchBar = () => {

    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState(0);

    async function fetchHotels() {
        let url = 'http://localhost:5000/hotels';
        let payload = {
            location: location,
            date: date,
            guests: guests,
        }

        /// Working on the serach bar, backend-db vs async call
    }

    return (
        <div className='bar'>
            <h2 className='subtitle'>Find your perfect stay...</h2>
            <div className='searchBar'>
                <div className='field'>
                    <input type='text' className='input' placeholder='Where to ?' onClick={(e) => setLocation(e.target.value)} required />
                </div>
                <div className='field'>
                    <input type='date' className='input' placeholder='When ?' onClick={(e) => setDate(e.target.value)} required />
                </div>
                <div className='field'>
                    <input type='number' className='input' placeholder='Number of guests' onClick={(e) => setGuests(e.target.value)} required />
                </div>
                <div className='field'>
                    <button>Search</button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;