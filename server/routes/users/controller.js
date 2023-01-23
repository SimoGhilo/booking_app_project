const pool = require('../../database');


const getUsers = (req, res) => {
    try {
        pool.query('select * from users', (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};

const getUserById = (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`select * from users where user_id=${id.toString()}`, (err, result) => {
            res.status(200).json(result.rows)
        })
    } catch (error) {
        console.error(error.message);
    }
};

const createUser = (req, res) => {
    const { user_name } = req.body;
    const { email } = req.body;
    const { user_password } = req.body;
    try {
        pool.query(`insert into users(user_name,email,user_password) values('${user_name}','${email}','${user_password}')`, (err, result) => {
            res.status(200).json(result.rows);
        })
    } catch (error) {
        console.error(error.message);
    }
};



module.exports = {
    getUsers, getUserById, createUser
}