import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HotelDetails from './hotelDetails'
import '../styles/searchBar.css';


// Date range picker 

import { Calendar, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}


let linkStyle = { textDecoration: "none", color: "black" };

const SearchBar = (props) => {

    const navigate = useNavigate()

    const todaysDate = new Date();
    let tomorrow = new Date(todaysDate);
    tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);

    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(todaysDate); // set check in date to todays date
    const [endDate, setEndDate] = useState(tomorrow); // set check out date, default tomorrow
    const [guests, setGuests] = useState(1);

    const [lengthStay, setLengthStay] = useState(0); /// set stay length in days

    const [properties, setProperties] = useState([]);

    // debug
    //console.log('check in', startDate);
    //console.log('check out', endDate);
    //console.log('todays date', todaysDate);
    //console.log('guests', guests);
    //console.log('length stay', lengthStay);

    function handleCheckInDate(e) {
        setStartDate(e)
    }
    function handleCheckOutDate(e) {
        setEndDate(e)
    }


    useEffect(() => {
        fetch(`http://localhost:5000/hotels/${location}`).then((response) => {
            response.json().then((data) => {
                setProperties(data);
            })
        })
        if (guests <= 0 || guests >= 5) {
            alert('Please select a number of guest between 1 and 4')
            setGuests(1);

        }
        if (endDate <= startDate) {
            alert('Please select a date after your check in date');
            setEndDate(tomorrow);
        }

        setLengthStay((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) /// Convert into days

    }, [location, startDate, endDate, setEndDate, setStartDate, guests, setGuests, lengthStay, setLengthStay])




    return (
        <>
            <div className='bar'>
                <h2 className='subtitle'>Find your perfect stay...</h2>
                <div className='searchBar'>
                    <div className='field'>
                        <input type='text' className='input' placeholder='Where to ?' onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <p>Check in</p>
                    <div className='field'>
                        {<input type='date' className='input' placeholder={todaysDate} onChange={(e) => handleCheckInDate(e.target.value)} value={startDate} min={new Date().toISOString().slice(0, 10)} required />}
                    </div>
                    <p>Check out</p>
                    <div className='field'>
                        {<input type='date' className='input' placeholder={tomorrow} onChange={(e) => handleCheckOutDate(e.target.value)} value={endDate} required />}
                    </div>
                    <div className='field'>
                        <input type='number' className='inputNumber' placeholder='Number of guests' onChange={(e) => setGuests(e.target.value)} value={guests} required />
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
                <Route path='/:hotel_name' element={<HotelDetails guests={guests} startDate={startDate} endDate={endDate} lengthStay={lengthStay} />}></Route>
            </Routes>
            <HotelDetails />
        </>
    );
};

export default SearchBar;