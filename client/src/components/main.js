import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../styles/main.css';

import Carousel from "react-elastic-carousel";
import "react-multi-carousel/lib/styles.css";
import Country from './country';


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
        <>
            <div>
                <h4 class="cities">Popular destinations</h4>
                <div className='cities'>
                    <Carousel itemsToShow={3}>
                        {
                            cities.map((city) => (
                                <div className='city'>
                                    <img src={city.img} />
                                    <figcaption><Link style={{ textDecoration: "none", color: "black" }} to={`/${city.location_name}`}>{city.location_name}</Link></figcaption>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
                <h4 class="cities">Destinations by country</h4>
                <div className='countries'>
                    {
                        cities.slice(4, 8).map((city) => (
                            <div className='country'>
                                <Link to={`/${city.country}`}><img src={city.img} /></Link>
                                <span className='text'>{city.country}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            {cities.slice(4, 8).map((city) => (
                <Routes>
                    <Route path={`/${city.country}`} element={<Country name={city.country} img1={city.img_country_1} img2={city.img_country_2} img3={city.img_country_3} img4={city.img_country_4} description1={city.country_description_1} description2={city.country_description_2} description3={city.country_description_3} description4={city.country_description_4} />}></Route>
                </Routes>
            ))
            }
        </>
    );
};

export default Main;