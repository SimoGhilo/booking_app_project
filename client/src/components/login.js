import React from 'react';
import '../styles/login.css';

const Login = () => {
    return (
        <div className='login'>
            <h2>Welcome back !</h2>
            <div className='info'>
                <input type="email" placeholder='email' />
            </div>
            <div className='info'>
                <input type="password" placeholder='password' />
            </div>
            <button type="submit">Login</button>
        </div>
    );
};

export default Login;