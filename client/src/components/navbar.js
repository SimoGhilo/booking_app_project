import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './login';
import Register from './register';
import Profile from './profile';
import '../styles/navbar.css';

import { toggleCheckout } from '../slice/loginSlice';



let linkStyle = { textDecoration: "none", color: "white" };



const Navbar = (props) => {



    // fetching redux status & user information

    let user = useSelector(state => state.loginStatus.user)
    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
    let isCheckedOut = useSelector(state => state.loginStatus.isCheckedOut);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    function switchCheckout() {
        dispatch(toggleCheckout(false));
        navigate('/')
    }

    useEffect(() => {

    }, [isCheckedOut, switchCheckout]);

    return (
        <>
            <nav className="navbar">
                <div className="logo"><Link to={'/'} onClick={switchCheckout}><img src='https://cdn-icons-png.flaticon.com/512/201/201623.png' onClick={() => props.setIsActive(true)} /></Link></div>
                <h1 className="title">Travel.com</h1>
                {
                    !loginStatus && (<ul className='menu'>
                        <li className="link"><Link style={linkStyle} to='/login' onClick={() => props.setIsActive(false)}>Log-in</Link></li>
                        <li className="link"><Link style={linkStyle} to='/register' onClick={() => props.setIsActive(false)}>Register</Link></li>
                    </ul>)
                }
                {
                    loginStatus && (
                        <div className="avatar">
                            <h6 className='avatarName'><Link to={"/Profile"} className="linkProfile" onClick={() => props.setIsActive(false)} >Hi {user.user_name} !</Link></h6>
                        </div>
                    )
                }
            </nav>
            {
                !loginStatus &&
                <Routes>
                    <Route path='/login' element={<Login setIsActive={props.setIsActive} />}></Route>
                    <Route path='/register' element={<Register isActive={props.isActive} setIsActive={props.setIsActive} />}></Route>
                </Routes>
            }
            {
                loginStatus && (
                    <Routes>
                        <Route path={"/Profile"} element={<Profile />}></Route>
                    </Routes>

                )
            }

        </>
    );
};

export default Navbar;