import React from 'react';
import Carousel from "react-elastic-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/country.css";

const Country = (props) => {
    return (
        <div className='wrapper'>
            <h2>{props.name}</h2>
            <Carousel itemsToShow={2}>
                <div className='img-container'>
                    <img style={{ height: "30rem", width: "22rem" }} src={props.img1} />
                    <figcaption><p>{props.description1}</p></figcaption>
                </div>
                <div className='img-container'>
                    <img style={{ height: "30rem", width: "22rem" }} src={props.img2} />
                    <figcaption><p>{props.description2}</p></figcaption>
                </div>
                <div className='img-container'>
                    <img style={{ height: "30rem", width: "22rem" }} src={props.img3} />
                    <figcaption><p>{props.description3}</p></figcaption>
                </div>
                <div className='img-container'>
                    <img style={{ height: "30rem", width: "22rem" }} src={props.img4} />
                    <figcaption><p>{props.description4}</p></figcaption>
                </div>
            </Carousel>
        </div>
    );
};

export default Country;