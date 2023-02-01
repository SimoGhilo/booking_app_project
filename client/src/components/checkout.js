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

    let [room, setRoom] = useState([])
    console.log(room)


    console.log(
        'Props in checkout',

        'length', props.lengthStay,
        'StartDate', props.startDate,
        'endDate', props.endDate
    )


    useEffect(() => {
        let url = `http://localhost:5000/rooms/${params.hotel_id}/${params.room_id}`;
        fetch(url).then((response) => {
            response.json().then((data) => {
                setRoom(data);
            }).catch((error) => {
                console.log(error);
            });
        })
    }, [])


    return (
        <div className='checkout-container'>
            {loginStatus === true && <>
                <h2>Your Booking details</h2>
                <section className='booking-details'>
                    <div className='check-in-out'>
                        <h5>Check in</h5>
                        <p>{props.startDate.toString().slice(0, 10)}</p>
                        <h5>Check out</h5>
                        <p>{props.endDate/*endDate.toString().slice(0, 10)*/}</p>
                        <h6>Total length of stay:</h6>
                        <p><strong>{props.lengthStay} {stringNight}</strong></p>
                    </div>
                    <div className='room-selection'>
                        <h5>Your room selection:</h5>
                        {room.map((r) => (
                            r.room_name
                        ))}
                    </div>
                    <div className='room-pricing'>
                        <h5>Your price summary:</h5>
                        {room.map((r) => (
                            r.room_rate * props.lengthStay
                        ))}
                    </div>
                </section>
                <section className='hotel-details'>
                    <h6>Hotel</h6>
                    {room.map((r) => (
                        r.hotel_name

                    ))}
                    {room.map((r) => (
                        r.location_name

                    ))}
                    {room.map((r) => (
                        r.country

                    ))}
                </section>
            </>}
        </div>
    );
};

export default Checkout;