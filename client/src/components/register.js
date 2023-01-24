import React, { useState } from 'react';
import '../styles/register.css';
var bcrypt = require('bcryptjs');

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function register() {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Debugging here : passowrd and name undefined
        console.log(hashedPassword)
        console.log(username)
        /// HERE      --------------------------------
        const url = 'http://localhost:5000/users'
        const payload = {
            username: username,
            email: email,
            password: hashedPassword
        }

        let result = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        result = await result.json();
        console.log(result)
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