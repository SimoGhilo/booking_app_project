const passport = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;
const pool = require('./database');


function initialize(passport) {

    async function authenticateUser(email, user_password, done) {

        pool.query(`select * from users where email='${email}'`, (err, result) => {

            if (err) throw err

            if (result.rows.length > 0) {

                const user = result.rows[0];

                bcrypt.compare(user_password, user.user_password, (err, match) => {

                    if (err) throw err

                    if (match) {

                        return done(null, user)

                    } else {

                        return done(null, false, { message: 'wrong password' })

                    }
                })


            } else {

                return done(null, false, { message: 'email not found' });

            }
        })
    }

    passport.use(new localStartegy({
        usernameField: "email",
        passwordField: "user_password",
    }, authenticateUser));

    /// Serialization & deserialization

    passport.serializeUser((user_id, done) => {
        done(null, user_id);
    })

    passport.deserializeUser((user, done) => {
        //console.log("deserialized user " + user.user_id);
        pool.query(`select * from users where user_id=${user.user_id}`, (err, result) => {
            if (err) throw err;
            return done(null, result.rows[0]);
        })
    })


}

module.exports = initialize;