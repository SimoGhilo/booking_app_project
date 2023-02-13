import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toggleCheckout } from '../slice/loginSlice';
import StripeContainer from './stripe/stripeContainer';
import '../styles/checkout.css';




const Checkout = (props) => {

    // fetching redux status
    let user = useSelector(state => state.loginStatus.user)
    let loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
    let isCheckedOut = useSelector(state => state.loginStatus.isCheckedOut);
    let dispatch = useDispatch();


    function switchCheckout() {
        props.setIsSearching(true);
        props.setStartDate(props.todaysDate);
        props.setEndDate(props.tomorrow);
        dispatch(toggleCheckout(false));
    }

    let stringNight = props.lengthStay > 1 ? 'nights' : 'night';

    const params = useParams();


    let [room, setRoom] = useState([])


    useEffect(() => {
        let url = `http://localhost:5000/rooms/${params.hotel_id}/${params.room_id}`;
        fetch(url).then((response) => {
            response.json().then((data) => {
                setRoom(data);
            }).catch((error) => {
                console.log(error);
            });
        })
    }, [isCheckedOut, toggleCheckout]);

    // Helper functions to manipulate date formats

    let check_in_date = props.startDate.toLocaleDateString().split(/\//);
    check_in_date = [check_in_date[2], check_in_date[1], check_in_date[0]].join('-');
    let check_out_date = props.endDate.toLocaleDateString().split(/\//);
    check_out_date = [check_out_date[2], check_out_date[1], check_out_date[0]].join('-');

    let price = room.map((r) => {
        return r.room_rate * props.lengthStay
    })
    let room_name = room.map((r) => {
        return r.room_name
    })

    let length = props.lengthStay;


    async function book() {

        const payload = {
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            user_id: user.user_id,
            price: price[0],
            length: length,
            guests: props.guests,
            room_name: room_name[0]
        }

        try {
            const response = await fetch(`http://localhost:5000/${params.hotel_id}/${params.room_id}/checkout`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            return response.json();

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='wrapper-checkout'>
            <h5 className='bd'>Your Booking details</h5>
            <div className='checkout-container'>
                {loginStatus === true && <div className='general'>
                    <section className='booking-details'>
                        <div className='check-in-out'>
                            <h6>Check in</h6>
                            <p>{props.startDate.toLocaleString().slice(0, 10)}</p>
                            <h6>Check out</h6>
                            <p>{props.endDate.toLocaleString().slice(0, 10)}</p>
                            <h6 className='length'>Total length of stay: {props.lengthStay} {stringNight}</h6>
                        </div>
                        <div className='room-selection'>
                            <h5>Your room selection:</h5>
                            {room.map((r) => (
                                <p>{r.room_name}</p>
                            ))}
                        </div>
                        <div className='room-pricing'>
                            <h5>Your price summary:</h5>
                            {room.map((r) => (
                                <p> £ {r.room_rate * props.lengthStay}</p>
                            ))}
                        </div>
                    </section>
                    <section className='hotel-details'>
                        <h5 className='hotel'>Hotel</h5>
                        {room.map((r) => (
                            <p className='name'>{r.hotel_name}</p>

                        ))}
                        <br />
                        {room.map((r) => (
                            <p className='location'>{r.location_name}</p>

                        ))}
                        <br />
                        {room.map((r) => (
                            <p>{r.country}</p>

                        ))}
                        {room.map((r) =>
                            <img className='hotel-img' src={r.hotel_img} />

                        )}

                    </section>
                    <div className='stripe'>
                        <StripeContainer price={price[0]} switchCheckout={switchCheckout} book={book} />
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default Checkout;