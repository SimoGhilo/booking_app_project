import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../styles/main.css';



const Main = () => {

    let [cities, setCities] = useState([]);



    useEffect(() => {
        fetch('http://localhost:5000/locations').then((response) => {
            response.json().then((data) => {
                setCities(data);
            })
        })
    })

    return (
        <div>
            <h4 class="cities">Popular destinations</h4>
            <div className='cities'>
                {
                    cities.slice(0, 4).map((city) => (
                        <div className='city'>
                            <img src={city.img} />
                            <figcaption><Link style={{ textDecoration: "none", color: "black" }} to={`/${city.location_name}`}>{city.location_name}</Link></figcaption>
                        </div>
                    ))

                }
            </div>
            <h4 class="cities">Destinations by country</h4>
            <div className='countries'>
                {
                    cities.slice(4, 8).map((city) => (
                        <div className='country'>
                            <Link to={`/${city.country}`}><img src={city.img} /></Link>
                            <span className='text'>{city.country}</span>

                            <div className='flag' style={{ backgroundImage: `url('${city.country_flag}')` }}></div>
                            {/*flag not showing up*/}
                            <Routes>
                                <Route path={`/${city.country}`}></Route>
                            </Routes>
                            {/*image carousel */}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Main;