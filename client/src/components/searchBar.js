import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HotelDetails from './hotelDetails'
import '../styles/searchBar.css';

let linkStyle = { textDecoration: "none", color: "black" };

const SearchBar = (props) => {

    const navigate = useNavigate()

    const [location, setLocation] = useState('');
    const [date, setDate] = useState(''); // set todays date
    const [guests, setGuests] = useState(0);

    const [properties, setProperties] = useState([]);
    //console.log(properties);


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
                        <button>Search</button>
                    </div>
                </div>
            </div>
            {properties.length >= 1 && (
                <>
                    <div className='result-title'><h5>{location}: {properties.length} properties found</h5></div>
                    <div className='hotel-results'>
                        {properties.map(prop => (
                            <>
                                <div className="property">
                                    <img className="property-pic" src={prop.hotel_img} />
                                    <section className="description-property">
                                        <figcaption><strong>{prop.hotel_name}</strong></figcaption>
                                        <p className='place'>{prop.location_name}</p>
                                        <p>{prop.hotel_description}</p>
                                        <button className='showPrices'><Link style={linkStyle} to={`/${prop.hotel_name}`} target="_blank" >View Hotel</Link></button>
                                    </section>
                                </div>
                            </>))}
                    </div>
                </>)}
            <Routes>
                <Route path='/:hotel_name' element={<HotelDetails />}></Route>
            </Routes>
            <HotelDetails location={location} />
        </>
    );
};

export default SearchBar;