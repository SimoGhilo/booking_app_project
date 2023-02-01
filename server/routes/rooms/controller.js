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
    try {
        const query = `select * from rooms left join hotels on rooms.hotel_id = hotels.hotel_id left join locations on hotels.location_id = locations.location_id where hotel_name='${hotel_name}'`;
        //console.log(query)
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
    //console.log('query here', query);
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