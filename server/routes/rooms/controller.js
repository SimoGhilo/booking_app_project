const pool = require('../../database');


const getRooms = (req, res) => {
    try {
        pool.query('select * from rooms', (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};

const getRoomsByHotelName = (req, res) => {

    const { hotel_name } = req.params
    const { hotel_id } = req.params
    const { arrival_date, departure_date } = req.params;


    try {
        const query = `select distinct on(room_name) * from rooms inner join hotels on rooms.hotel_id = hotels.hotel_id 
        inner join locations on hotels.location_id = locations.location_id where hotel_name='${hotel_name}' and rooms.hotel_id =${hotel_id}
      and rooms.room_id not in ( select bookings.room_id from bookings where check_in_date between ('${arrival_date}') and ('${departure_date}')
    or  check_out_date between ('${arrival_date}') and ('${departure_date}') ) 
    or rooms.hotel_id = ${hotel_id} and rooms.room_id in (select bookings.room_id from bookings where check_in_date = '${departure_date}' or check_out_date = '${arrival_date}')`;
        console.log(query)
        pool.query(query, (err, result) => {
            if (err) { console.error(err); }
            res.status(200).json(result.rows)

        })
    } catch (error) {
        console.error(error.message);
    }
};

const getRoomByRoomId = (req, res) => {
    const hotel_id = req.params.hotel_id
    const room_id = req.params.room_id;
    const query = `select * from rooms inner join hotels on rooms.hotel_id = hotels.hotel_id inner join locations on hotels.location_id=locations.location_id  where rooms.room_id=${room_id} and hotels.hotel_id=${hotel_id}`;

    try {
        pool.query(query, (err, result) => {
            if (err) { console.error(err); }
            res.status(200).json(result.rows)
        })

    } catch (error) {
        console.error(error.message);
    }

}



module.exports = {
    getRooms, getRoomsByHotelName, getRoomByRoomId
}