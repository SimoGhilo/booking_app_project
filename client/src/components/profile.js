import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import '../styles/profile.css';
import { setLoginStatus } from '../slice/loginSlice';


const Profile = (props) => {

    // fetching redux status
    let user = useSelector(state => state.loginStatus.user)
    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    let setIsActive = props.setIsActive;

    let [bookings, setBookings] = useState([]);

    console.log('bookings', bookings);

    useEffect(() => {
        let url = `http://localhost:5000/bookings/${user.user_id}`;
        if (loginStatus == true) {
            fetch(url).then((response) => {
                response.json().then((data) => {
                    setBookings(data);
                })
            }).catch((error) => {
                console.error(error);
            });
        }

    }, [cancel, loginStatus])

    async function logout() {
        let url = 'http://localhost:5000/logout';
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })

        if (result.status === 200) {
            const data = await result.json();
            console.log(data);
            dispatch(setLoginStatus(data.loggedIn))
            setIsActive(true)
            navigate('/')

        } else {
            console.log('error ', result.status)
        }

    }

    async function cancel(booking_id) {
        let url = `http://localhost:5000/cancel/${booking_id}`;
        await fetch(url, {
            method: 'DELETE',
        }).then((res) => {
            if (res.status) {

                alert('Booking cancelled successfully');
            } else {
                alert('Error removing item')
            }
        });
    }



    return (
        <>{loginStatus &&
            <div className='loggedIn'>
                <div className='avatar-info'>
                    <h1>Account</h1>
                    <p className='avatar'>Username : {user.user_name}</p>
                    <p className='avatar'>Email : {user.email}</p>
                    <button className='logout' onClick={logout}>Logout</button>
                </div>
                <h2>Bookings & Trips</h2>
                <div className='trips'>
                    <h5>Your trips</h5>
                    {bookings.map((booking) => (
                        <div className='booking'>
                            <div className='property-info'>
                                <h3 className='prop-name'>{booking.hotel_name}</h3>
                                <p className='pos'>{booking.location_name}</p>
                                <p className='pos'>{booking.country}</p>
                                <img src={booking.hotel_img} />
                                <div className="button-container">
                                    <button className='cancel' onClick={() => cancel(booking.booking_id)}>Cancel booking</button>
                                </div>
                            </div>
                            <div className='info-container'>
                                <h6>Check in</h6>
                                <p>{booking.check_in_date.slice(0, 10)}</p>
                                <h6>Check out</h6>
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
            {loginStatus == false &&
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