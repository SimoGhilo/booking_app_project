import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HotelDetails from './hotelDetails'
import Checkout from './checkout';
import '../styles/searchBar.css';
import DateSelectorStart from './dateSelectorStart';
import DateSelectorEnd from './dateSelectorEnd';




let linkStyle = { textDecoration: "none", color: "black" };

const SearchBar = (props) => {

    // Redux state 

    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn);
    let user = useSelector(state => state.loginStatus.user);
    let isCheckedOut = useSelector(state => state.loginStatus.isCheckedOut);

    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0)
    let tomorrow = new Date(todaysDate);
    tomorrow.setDate(tomorrow.getDate() + 1);



    const [location, setLocation] = useState('');
    let [startDate, setStartDate] = useState(todaysDate); // set check in date to todays date
    let [endDate, setEndDate] = useState(tomorrow); // set check out date, default tomorrow
    const [guests, setGuests] = useState(1);

    // debug
    //startDate = startDate.split(/\//);
    //startDate = [startDate[2], startDate[1], startDate[0]].join(',');
    console.log('startDate: ', startDate);
    console.log('end date', endDate);

    // Helper functions for date parsing

    /* var initial = typeof startDate == 'string' ? startDate.split(/\//) : startDate;
     initial = [initial[1], initial[0], initial[2]].join('-');
     var ending = typeof endDate == 'string' ? endDate.split(/\//) : endDate;
     ending = [ending[1], ending[0], ending[2]].join('-');
 
     console.log('initial', initial);
     console.log('ending', ending);
 
     let begin = initial.split('-');
     begin = begin.filter(n => n)
     console.log('begin', begin);
     let starting_date = typeof begin == 'string' ? new Date(begin[2], begin[0] - 1, begin[1]) : begin
 
     let stop = ending.split('-');
     stop = stop.filter(n => n)
     console.log('stop', stop);
     let ending_date = typeof stop == 'string' ? new Date(stop[2], stop[0] - 1, stop[1]) : stop
 
     console.log('debug start date type here', starting_date)
     console.log('debug end date type here', ending_date) */


    //// Errors in the logic to generate the length of the stay //// check with harry




    const [lengthStay, setLengthStay] = useState(Math.floor((endDate.getTime() - startDate.getTime()) / 86400000)); /// set stay length in days

    console.log('length stay in search bar', lengthStay);

    const [properties, setProperties] = useState([]);

    const [isSearching, setIsSearching] = useState(true);

    function handleCheckInDate(e) {
        let checkIn = new Date(e)
        setStartDate(checkIn)
    }
    function handleCheckOutDate(e) {
        let checkOut = new Date(e)
        setEndDate(checkOut)
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
            setStartDate(todaysDate);
            setLengthStay(1);
        }

        // if (Array.isArray(starting_date)) { starting_date = new Date(starting_date[1], startDate[2] - 1, starting_date[3]); }
        // if (Array.isArray(ending_date)) { ending_date = new Date(ending_date[1], ending_date[2] - 1, ending_date[3]); }
        // setLengthStay(Math.floor(ending_date.getTime() - starting_date.getTime()) / 86400000) /// Convert into days
        setLengthStay(Math.floor((endDate.getTime() - startDate.getTime()) / 86400000));

    }, [location, startDate, endDate, setEndDate, setStartDate, guests, setGuests, lengthStay, setLengthStay, isSearching, setIsSearching, /*ending_date, starting_date*/])



    return (
        <>
            {!isCheckedOut &&
                <div className='bar'>
                    <h2 className='subtitle'>Find your perfect stay...</h2>
                    <div className='searchBar'>
                        <div className='field'>
                            <input type='text' className='input' placeholder='Where to ?' onChange={(e) => setLocation(e.target.value)} required />
                        </div>
                        {/* <p>Check in</p>
                        <div className='field'>
                            <input type='date' className='input' placeholder={todaysDate} onChange={(e) => handleCheckInDate(e.target.value)} value={startDate.toLocaleString('en-GB').slice(0, 10)} min={new Date().toISOString().slice(0, 10)} required />
                        </div>
                        <p>Check out</p>
                        <div className='field'>
                            <input type='date' className='input' placeholder={tomorrow} onChange={(e) => handleCheckOutDate(e.target.value)} value={endDate.toLocaleString('en-GB').slice(0, 10)} min={new Date().toISOString().slice(0, 10)} required />
            </div>*/ }
                        <p>Check in</p>
                        <DateSelectorStart handleCheckInDate={handleCheckInDate} startDate={startDate} todaysDate={todaysDate} />
                        <p>Check out</p>
                        <DateSelectorEnd handleCheckOutDate={handleCheckOutDate} endDate={endDate} tomorrow={tomorrow} />
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
                <Route path='/:hotel_id/:room_id/checkout' element={<Checkout lengthStay={lengthStay} startDate={/*check_in_date */startDate} endDate={/*check_out_date */ endDate} guests={guests} />}></Route>
            </Routes>
            }
        </>
    );
};

export default SearchBar;