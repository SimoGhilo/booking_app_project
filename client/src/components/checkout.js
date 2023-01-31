import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const Checkout = (props) => {

    // fetching redux status
    let user = useSelector(state => state.loginStatus.user)
    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)

    let stringNight = props.lengthStay > 1 ? 'nights' : 'night';

    const params = useParams();
    //console.log(params.hotel_id   )

    let [room, setRoom] = useState()
    console.log(room)


    console.log(
        'Props',

        'length', props.lengthStay,
        'StartDate', props.startDate,
        'endDate', props.endDate
    )

    /// below is Wrong, need hotel name
    useEffect(() => {
        let url = `http://localhost:5000/rooms/${params.hotel_id}/${params.room_id}`;
        fetch(url).then((response) => {
            response.json().then((data) => {
                setRoom(data);
            })
        })
    }, [])






    return (
        <div className='checkout-container'>
            {loginStatus === true && <>
                <h2>Your Booking details</h2>
                <section className='booking-details'>
                    <div className='check-in-out'>
                        <h5>Check in</h5>
                        <p>{props.startDate}</p>
                        <h5>Check out</h5>
                        <p>{props.endDate}</p>
                        <h6>Total length of stay:</h6>
                        <p><strong>{props.lengthStay} {stringNight}</strong></p>
                    </div>
                    <div className='room-selection'></div>
                    {/*trying to display the room_name */}
                </section>
            </>}
        </div>
    );
};

export default Checkout;