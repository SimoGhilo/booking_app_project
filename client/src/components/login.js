import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus, setUser } from '../slice/loginSlice';
import '../styles/login.css';

const Login = (props) => {

    const dispatch = useDispatch();



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
            // toggling active status in app top component
            setIsActive(true);
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
            alert('Email or password incorrect')
        }
    }


    async function handleFacebookLogin() {
        const url = 'http://localhost:5000/auth/facebook';
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5000',
                },
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',

            })
            console.log(response)
        } catch (error) {
            console.log(error);
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
            <div className='facebook-wrapper'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg' onClick={handleFacebookLogin} />
                <form action="http://localhost:5000/auth/facebook" method="GET" >
                    <input className='facebook' type="submit" value="Press to log in" />
                </form>
            </div>
        </div>
    );
};

export default Login;