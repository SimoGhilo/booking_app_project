import React, { useEffect, useState } from 'react';
import '../styles/searchBar.css';

const SearchBar = () => {

    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState(0);

    const [properties, setProperties] = useState([]);
    console.log(properties);


    useEffect(() => {
        fetch(`http://localhost:5000/hotels/${location}`).then((response) => {
            response.json().then((data) => {
                setProperties(data);
            })
        })
    }, [location])






    return (
        <>
            <div className='bar'>
                <h2 className='subtitle'>Find your perfect stay...</h2>
                <div className='searchBar'>
                    <div className='field'>
                        <input type='text' className='input' placeholder='Where to ?' onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className='field'>
                        <input type='date' className='input' placeholder='When ?' onClick={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className='field'>
                        <input type='number' className='input' placeholder='Number of guests' onClick={(e) => setGuests(e.target.value)} required />
                    </div>
                    <div className='field'>
                        <button /*onClick={getProperties}*/>Search</button>
                    </div>
                </div>
            </div>
            {properties.length >= 1 && (<div className='hotel-results'>
                {properties.map(prop => (<div className="property">
                    <img className="property-pic" src={prop.hotel_img} />
                    <figcaption><strong>{prop.hotel_name}</strong></figcaption>
                    <p>{prop.hotel_description}</p>
                </div>))}
            </div>)}
        </>
    );
};

export default SearchBar;