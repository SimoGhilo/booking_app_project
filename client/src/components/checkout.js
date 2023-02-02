import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/checkout.css';

let linkStyle = { textDecoration: "none", color: "black" };


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
    }, []);

    // debug
    /* let payloadStartDate = props.startDate.slice(0, 10);
     let payloadEndDate = props.startDate.slice(0, 10);
     console.log(new Date(payloadStartDate))
     console.log(new Date(payloadEndDate)) */
    let check_in_date = new Date(props.startDate)
    let check_out_date = new Date(props.endDate)
    //check_in_date = check_in_date.getFullYear() + '-' + (check_in_date.getMonth() + 1) + '-' + check_in_date.getDate();
    //check_out_date = check_out_date.getFullYear() + '-' + (check_out_date.getMonth() + 1) + '-' + check_out_date.getDate();
    //console.log('c/i', typeof check_in_date)
    //console.log('c/o', typeof check_out_date)

    /* Date.prototype.getDateWithoutTime = function () {
         return new Date(this.toDateString());
     } */

    //console.log(Date.getDateWithoutTime(props.startDate));
    //console.log('in checkout', props.startDate)


    var cI = new Date(check_in_date.getFullYear(), check_in_date.getMonth(), check_in_date.getDate());
    var cO = new Date(check_out_date.getFullYear(), check_out_date.getMonth(), check_out_date.getDate());

    async function book() {

        const payload = {
            check_in_date: cI,
            check_out_date: cO,
            user_id: user.user_id
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
        <div className='wrapper'>
            <h5 className='bd'>Your Booking details</h5>
            <div className='checkout-container'>
                {loginStatus === true && <>
                    <section className='booking-details'>
                        <div className='check-in-out'>
                            <h5>Check in</h5>
                            <p>{props.startDate.toString().slice(0, 10)}</p>
                            <h5>Check out</h5>
                            <p>{props.endDate}</p>
                            <h5>Total length of stay:</h5>
                            <p><strong>{props.lengthStay} {stringNight}</strong></p>
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
                        <h5>Hotel</h5>
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
                            <img src={r.hotel_img} />

                        )}
                        <button className='now'><Link style={linkStyle}><p className='complete' onClick={book}>Complete Booking</p></Link></button>
                    </section>
                </>}

            </div>
        </div>
    );
};

export default Checkout;