import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
var bcrypt = require('bcryptjs');

const Register = (props) => {


    const setIsActive = props.setIsActive;

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [registered, setRegistered] = useState(false)

    const navigate = useNavigate();


    useEffect(() => {
        if (registered) {
            navigate('/');
            setIsActive(true);
        }
    }, [registered]);

    async function register() {
        const hashedPassword = await bcrypt.hash(password, 10);

        const url = 'http://localhost:5000/users'
        const payload = {
            user_name: username,
            email: email,
            user_password: hashedPassword
        }

        await fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)

        })
        setRegistered(true);

    }


    return (
        <div className='registration'>
            <h2>Create account</h2>
            <div className='info'>
                <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className='info'>
                <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='info'>
                <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" onClick={register}>Register</button>
        </div>
    );
};

export default Register;