const pool = require('../../database');

/* Not in use at the moment, using last function to search hotels by location 


const getHotels = (req, res) => {
    try {
        pool.query('select * from hotels', (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};

*/

const getHotelById = (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`select * from hotels where hotel_id=${id.toString()}`, (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};


const getHotelsByLocationName = (req, res) => {
    const name = req.params.name || req.body.name;  /// Will come back later, request from body from FE?
    try {
        const query = `select * from hotels where location_name='${name}'`;
        pool.query(query, (err, result) => {
            // Debugging - console.log(query)
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};



module.exports = {
    getHotelById, getHotelsByLocationName
}