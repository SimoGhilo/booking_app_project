const passport = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
const pool = require('./database');

require("dotenv").config();

console.log(process.env.FACEBOOK_CLIENT_SECRET_KEY)




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
        console.log("deserialized user " + user.user_id);
        pool.query(`select * from users where user_id=${user.user_id}`, (err, result) => {
            if (err) throw err;
            return done(null, result.rows[0]);
        })
    })

    passport.use(new FacebookStrategy({
        clientID: "1845698709138421",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET_KEY,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ["id", "name", "email"]
    },
        function (accessToken, refreshToken, profile, cb) {

            const user_email = profile.emails[0].value;

            pool.query(`select * from users where email='${user_email}'`, (err, result) => {
                //console.log('in passport', result);
                if (err) { throw err; console.log(err) }

                // user in db

                if (result.rows.length > 0) {

                    user = result.rows[0];

                    return cb(err, user);
                } else {

                    const user_name = profile.name.givenName;
                    const user_email = profile.emails[0].value;

                    const query = `insert into users(user_name,email,user_password) values('${user_name}','${user_email}','${'none'}')`;
                    // Creates entry in the database

                    pool.query(query, (err, result) => {

                        if (err) { return cb(null, false); } else {

                            //selects the new entry in the database

                            pool.query(`select * from users where email='${user_email}'`, (err, result) => {

                                if (err) { return cb(null, false); } else {

                                    const user = result.rows[0]

                                    // console.log(user)

                                    return cb(null, user);
                                }

                            })

                        }

                    })
                }

            })



        }))


}

module.exports = initialize;