import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import '../styles/profile.css';


const Profile = () => {

    // fetching redux status
    let user = useSelector(state => state.loginStatus.user)
    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)

    let [bookings, setBookings] = useState([]);

    console.log('bookings', bookings);

    useEffect(() => {
        let url = `http://localhost:5000/bookings/${user.user_id}`;
        fetch(url).then((response) => {
            response.json().then((data) => {
                setBookings(data);
            })
        }).catch((error) => {
            console.error(error);
        });
    }, [])



    return (
        <>{loginStatus &&
            <div className='loggedIn'>
                <h1>Account</h1>
                <div className='avatar-info'>
                    <p className='avatar'>Username : {user.user_name}</p>
                    <p className='avatar'>Email : {user.email}</p>
                </div>
                <h2>Bookings & Trips</h2>
                <div className='trips'>
                    <h5>Your trips</h5>
                    {bookings.map((booking) => (
                        <div className='booking'>
                            <div className='property-info'>
                                <h3>{booking.hotel_name}</h3>
                                <p>{booking.location_name}</p>
                                <p>{booking.country}</p>
                                <img src={booking.hotel_img} />
                            </div>
                            <div className='info-container'>
                                <h5>Check in</h5>
                                <p>{booking.check_in_date.slice(0, 10)}</p>
                                <h5>Check out</h5>
                                <p>{booking.check_out_date.slice(0, 10)}</p>
                                <h6>Total length stay</h6>
                                <p>{booking.length}</p>
                                <h6>Total price</h6>
                                <p>£ {booking.price}</p>
                                <p>People : {booking.guests}</p>
                                <p>Room : {booking.room_name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            {!loginStatus &&
                <div className='notloggedIn'>
                    <h1>Account</h1>
                    <h6>You are currently not logged in, please log-in below</h6>
                    <Link to={'/login'}>Login</Link>
                    <h6>Haven't you got an account yet ?</h6>
                    <h6>Sign up</h6>
                    <Link to={'/register'}>Register</Link>
                    <Routes>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                    </Routes>
                </div>}
        </>
    );
};

export default Profile;