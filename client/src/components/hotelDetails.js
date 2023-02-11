import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/hotelDetails.css';
import Checkout from './checkout';
import { toggleCheckout } from '../slice/loginSlice';

let linkStyle = { textDecoration: "none", color: "black" };

const HotelDetails = (props) => {

    let startDate = props.startDate;
    let endDate = props.endDate;
    console.log('checkin', startDate, 'checkout', endDate, 'length stay', props.lengthStay);

    // fetching redux status

    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
    let isCheckedOut = useSelector(state => state.loginStatus.isCheckedOut);
    let dispatch = useDispatch();
    let navigate = useNavigate();


    let [rooms, setRooms] = useState([]);

    let [length, setLength] = useState(0);
    console.log('local state', length);


    function switchCheckout() {
        dispatch(toggleCheckout(true));
    }

    let { hotel_name } = useParams()

    let stringNight = props.lengthStay > 1 ? 'nights' : 'night';
    //console.log('Props', props.lengthStay)
    // console.log('local state', length)

    /// extra charge for weekends , will do later ... console.log(new Date(props.startDate).getDay(), new Date(props.endDate).getDay())

    useEffect(() => {
        let url = `http://localhost:5000/rooms/${hotel_name}`
        fetch(url).then((response) => {
            response.json().then((data) => {
                setRooms(data)
            });
        });
        setLength(props.lengthStay);

    }, [hotel_name, isCheckedOut, toggleCheckout, props.lengthStay, length, startDate, endDate, goBack])


    function goBack() {
        navigate(-1)
        props.setIsSearching(true);
    }

    return (
        <>
            {!isCheckedOut && (
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
                            <div className='table-wrapper'>
                                <h2 className='availability'>Availability</h2>
                                <table>
                                    <tr className='header'>
                                        <th><p>Room Type</p></th>
                                        <th><p>Room Capacity</p></th>
                                        <th><p>Total Price for {props.lengthStay} {stringNight}</p></th>
                                        {loginStatus === true && <th><p>Reserve</p></th>}
                                    </tr>
                                    {Object.keys(rooms).map((key) => (
                                        <>
                                            <tr>
                                                {rooms[key].room_capacity >= props.guests && (
                                                    <>
                                                        <td><p>{rooms[key].room_name}</p></td>
                                                        <td><p>{rooms[key].room_capacity}</p></td>
                                                        {props.lengthStay > 0 && <td><p> £ {(rooms[key].room_rate) * props.lengthStay}</p></td>}
                                                        {loginStatus === true && <><td className='book'><Link to={`/${rooms[key].hotel_id}/${rooms[key].room_id}/checkout`} style={linkStyle} onClick={switchCheckout}><p>Book</p></Link></td></>}
                                                    </>)}
                                            </tr>
                                        </>
                                    ))}
                                </table>
                                <button className='back' onClick={goBack}><p>Back to search</p></button>
                            </div>
                        </>
                    ))}
                </div>)};
        </>
    );
};

export default HotelDetails;