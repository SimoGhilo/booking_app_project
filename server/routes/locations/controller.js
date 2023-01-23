const pool = require('../../database');


const getLocations = (req, res) => {
    try {
        pool.query('select * from locations', (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};

const getLocationByName = (req, res) => {
    let name = req.params.name;
    try {
        const query = `select * from locations where location_name='${name}'`
        pool.query(query, (err, result) => {
            res.status(200).json(result.rows)

        })
    } catch (error) {
        console.error(error.message);
    }
};



module.exports = {
    getLocations, getLocationByName
}