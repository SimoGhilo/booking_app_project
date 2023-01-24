import React, { useEffect, useState } from 'react';
import '../styles/main.css';



const Main = () => {

    let [cities, setCities] = useState([]);
    let [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/locations').then((response) => {
            response.json().then((data) => {
                setCities(data);
            })
        })
    })

    return (
        <div>
            <div className='cities'>
                {
                    cities.map((city) => (
                        <div className='city'>
                            <img src={city.img} />
                            <figcaption>{city.location_name}</figcaption>
                        </div>
                    ))

                }
            </div>
            <br />
            <div className='countries'>

            </div>
        </div>
    );
};

export default Main;