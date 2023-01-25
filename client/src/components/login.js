import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus, setUser } from '../slice/loginSlice';
import '../styles/login.css';

const Login = (props) => {

    const dispatch = useDispatch();
    /* Testing redux status -- let isLoggedIn = useSelector(state => state.loginStatus.isLoggedIn);
     console.log(isLoggedIn); */


    const navigate = useNavigate();

    // toggling home components after login
    const setIsActive = props.setIsActive;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isloggedin, setIsLoggedin] = useState(false)

    useEffect(() => {
        if (isloggedin) {
            // toggling login status in redux store
            dispatch(setLoginStatus(true))
            // toggling login status in local state
            setIsActive(false);
            navigate('/')
        }
    }, [isloggedin, dispatch])

    async function login() {
        const url = 'http://localhost:5000/login';
        const payload = {
            email: email,
            user_password: password
        }


        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            body: JSON.stringify(payload)
        });

        if (result.status === 200) {
            const data = await result.json();
            //console.log(data);
            // setting local status
            setIsLoggedin(data.loggedIn);
            // sending user info to redux store
            dispatch(setUser(data.user));

        } else {

            console.log('Invalid credentials or error: ' + result.status);
        }
    }
    return (
        <div className='login'>
            <h2>Welcome back !</h2>
            <div className='info'>
                <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='info'>
                <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" onClick={login}>Login</button>
        </div>
    );
};

export default Login;