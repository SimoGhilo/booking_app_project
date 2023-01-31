import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/hotelDetails.css';

const HotelDetails = (props) => {

    let [rooms, setRooms] = useState([]);

    let { hotel_name } = useParams()



    useEffect(() => {
        let url = `http://localhost:5000/rooms/${hotel_name}`
        fetch(url).then((response) => {
            response.json().then((data) => {
                setRooms(data)
            });
        });

    }, [hotel_name])


    return (
        <>
            <div className='content'>
                {Object.keys(rooms).splice(0, 1).map((key) => (
                    <>
                        <div className='room-container'>
                            <h2>{hotel_name}</h2>
                            <p className='description'>{rooms[key].hotel_description_2}</p>
                            <img src={rooms[key].room_img_1} />
                            <img src={rooms[key].room_img_2} />
                            <img src={rooms[key].room_img_3} />
                            <img src={rooms[key].hotel_img} />
                        </div>
                        <h2 className='availability'>Availability</h2>
                        <div className='table-wrapper'>
                            <table>
                                <tr className='header'>
                                    <th><p>Room Type</p></th>
                                    <th><p>Room Capacity</p></th>
                                    <th><p>Total Price</p></th>
                                    <th><p>Reserve</p></th>
                                </tr>
                                {Object.keys(rooms).map((key) => (
                                    <>
                                        <tr>
                                            {rooms[key].room_capacity >= props.guests && (
                                                <>
                                                    <td><p>{rooms[key].room_name}</p></td>
                                                    <td><p>{rooms[key].room_capacity}</p></td>
                                                    <td><p> £ {(rooms[key].room_rate) * props.lengthStay}</p></td>
                                                    <button className='book'>Book</button>
                                                </>)}
                                        </tr>
                                    </>
                                ))}
                            </table>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
};

export default HotelDetails;