const pool = require('../../database');


const getHotels = async (req, res) => {
    try {
        await pool.query('select * from hotels', (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};



module.exports = {
    getHotels,
}