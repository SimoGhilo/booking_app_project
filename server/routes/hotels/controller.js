const pool = require('../../database');


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
    const location = req.params.location;
    try {
        const query = `select * from hotels inner join locations on hotels.location_id = locations.location_id where location_name='${location}'`;
        pool.query(query, (err, result) => {
            if (err) { console.log(err) }
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};



module.exports = {
    getHotelById, getHotelsByLocationName
}