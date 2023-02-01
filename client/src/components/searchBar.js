import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HotelDetails from './hotelDetails'
import Checkout from './checkout';
import '../styles/searchBar.css';


let linkStyle = { textDecoration: "none", color: "black" };

const SearchBar = (props) => {

    // Redux state 

    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn);
    let user = useSelector(state => state.loginStatus.user);
    let isCheckedOut = useSelector(state => state.loginStatus.isCheckedOut);

    const todaysDate = new Date();
    let tomorrow = new Date(todaysDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(todaysDate); // set check in date to todays date
    const [endDate, setEndDate] = useState(tomorrow); // set check out date, default tomorrow
    const [guests, setGuests] = useState(1);

    // debug
    //console.log('start date', startDate)
    //console.log('end date', endDate);

    const [lengthStay, setLengthStay] = useState(0); /// set stay length in days

    const [properties, setProperties] = useState([]);

    const [isSearching, setIsSearching] = useState(true);

    function handleCheckInDate(e) {
        setStartDate(e)
    }
    function handleCheckOutDate(e) {
        setEndDate(e)
    }
    function toggleSearch() {
        setIsSearching(!isSearching)
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

    }, [location, startDate, endDate, setEndDate, setStartDate, guests, setGuests, lengthStay, setLengthStay, isSearching, setIsSearching])




    return (
        <>
            {!isCheckedOut &&
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
            }

            {isSearching && <>
                {!isCheckedOut &&
                    <>
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
                                                    <button className='showPrices'><Link style={linkStyle} to={`/${prop.hotel_name}`} onClick={toggleSearch} ><p>View Hotel</p></Link></button>
                                                </section>
                                            </div>
                                        </>))}
                                </div>
                            </>)}
                    </>
                }
            </>}
            <Routes>
                <Route path='/:hotel_name' element={<HotelDetails guests={guests} startDate={startDate} endDate={endDate} lengthStay={lengthStay} />}></Route>
            </Routes>
            {isCheckedOut && <Routes>
                <Route path='/:hotel_id/:room_id/checkout' element={<Checkout lengthStay={lengthStay} startDate={startDate} endDate={endDate} />}></Route>
            </Routes>
            }
        </>
    );
};

export default SearchBar;