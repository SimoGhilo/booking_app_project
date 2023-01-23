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

const getRoomsByHotelId = (req, res) => {
    const { id } = req.params
    try {
        const query = `select * from rooms where hotel_id=${id}`;
        pool.query(query, (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};



module.exports = {
    getRooms, getRoomsByHotelId
}