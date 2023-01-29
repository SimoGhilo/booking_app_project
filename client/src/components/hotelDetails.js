import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import '../styles/hotelDetails.css';

const HotelDetails = (props) => {

    let [rooms, setRooms] = useState([]);


    let { hotel_name } = useParams()



    useEffect(() => {
        let url = `http://localhost:5000/rooms/${hotel_name}`
        fetch(url).then((response) => {
            response.json().then((data) => {
                // console.log('data here', data);
                setRooms(data)
            });
        });

    }, [hotel_name])


    return (
        <>
            <h2>{hotel_name}</h2>
            <Carousel className='carousel' >
                {Object.keys(rooms).map((key) => (
                    <>

                        <div className='room-container'>
                            <h2>{rooms[key].room_name}</h2>
                            <img src={rooms[key].room_img_1} />
                        </div>


                    </>
                ))}
            </Carousel>
            {/* carousel displays two rows  */}
        </>
    );
};

export default HotelDetails;