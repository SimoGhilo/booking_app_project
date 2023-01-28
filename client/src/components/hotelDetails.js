import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HotelDetails = (props) => {

    let [rooms, setRooms] = useState([]);

    let { hotel_name } = useParams()

    console.log(rooms) /* Looks as if the data is disappearing after a while from the console */



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
        <div>
            <h2>{hotel_name}</h2>
            { /*hotel_name != undefined && <p>{props.location}</p>*/}
            {Object.keys(rooms).map((key) => (
                <>
                    <div class="property-carousel">

                    </div>
                    <div className='room-container'>
                        <h3>{rooms[key].room_name}</h3>
                    </div>
                </>
            ))

            }


        </div>
    );
};

export default HotelDetails;