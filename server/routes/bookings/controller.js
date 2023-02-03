const pool = require('../../database');


// get all bookings

const getBookings = (req, res) => {
    try {
        pool.query('select * from bookings', (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};

/// get bookings by user_id

const getBookingsByUserId = (req, res) => {
    const user_id = req.params.user_id;
    try {
        pool.query(`select * from bookings inner join hotels on bookings.hotel_id = hotels.hotel_id inner join locations on hotels.location_id = locations.location_id where user_id=${user_id}`, (err, result) => {
            res.status(200).json(result.rows);
        });
    } catch (error) {
        console.error(error.message);
    }
}





module.exports = {
    getBookings, getBookingsByUserId
}