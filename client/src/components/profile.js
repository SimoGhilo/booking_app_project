import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';


const Profile = () => {

    // fetching redux status
    let user = useSelector(state => state.loginStatus.user)
    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)

    //console.log(user, loginStatus)

    return (
        <>{loginStatus &&
            <div className='loggedIn'>
                <h1>Account</h1>
                <h2>Bookings & Trips</h2>

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