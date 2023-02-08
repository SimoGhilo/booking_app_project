const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000

// Imports

const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Initialize passport & session

const initializePassport = require('./passport');

initializePassport(passport);

// middleware


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 7 * 24 * 3600 * 1000,
        sameSite: 'lax',
    }
}));


// initialize passport middleware

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// cors middleware

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// cookie parser
app.use(cookieParser('secret'))

app.get('/', (req, res) => {
    res.send('All working')
})



// Routes

const hotelsRouter = require('./routes/hotels/hotels');
app.use('/hotels', hotelsRouter);

const locationsRouter = require('./routes/locations/locations');
app.use('/locations', locationsRouter);

const roomsRouter = require('./routes/rooms/rooms');
app.use('/rooms', roomsRouter);

const usersRouter = require('./routes/users/users');
app.use('/users', usersRouter);

const bookingsRouter = require('./routes/bookings/bookings');
app.use('/bookings', bookingsRouter);

const pool = require('./database');
/// Functionalities Backend

// Register and Log in

app.post('/register', async (req, res) => {

    let { user_name, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        // Debug console.log('hashedPassword', hashedPassword)
        pool.query(`select * from users where email=${email}`, (err, result) => {

            if (err) { throw err };

            if (result.rows.length > 0) {

                res.status(409).send({ message: 'User already registered' });

            } else {

                pool.query(`insert into users(user_name,email,user_password) values('${user_name}','${email}','${hashedPassword}')`, (err, result) => {

                    if (err) { throw err } else {

                        res.redirect('http://localhost:3000/login')
                    }
                })
            }
        })


    } catch (error) {
        console.error(error.message);
    }


})

app.post('/login', passport.authenticate('local', {}), (req, res) => {

    if (req.session.passport.user) {
        // debug
        //console.log(req.session.passport.user)
        res.send({ loggedIn: true, user: req.session.passport.user })
    } else {
        res.send({ loggedIn: false, message: 'Error authent' })
    }
})


/// keep the session open

app.get('/isLoggedIn', (req, res) => {
    console.log('In isLoggedIn', req.session?.passport?.user);
    if (req.session?.passport?.user) {

        res.send({ loggedIn: true, user: req.session.passport.user });

    } else {
        res.send({ loggedIn: false });

    }

});


//logout

app.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/isLoggedIn');
    });
})

// Facebook Oauth

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ["email"] }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        //console.log('callback facebook user', req.user);
        res.redirect('http://localhost:3000/');
    });



/// Book a room

app.post(`/:hotel_id/:room_id/checkout`, async (req, res) => {

    let { hotel_id, room_id } = req.params;

    let { check_in_date, check_out_date, user_id, price, length, guests, room_name } = req.body;

    try {
        let query = `insert into bookings(user_id, hotel_id, room_id, check_in_date, check_out_date, price, length, guests, room_name) values(${user_id},${hotel_id},${room_id},'${check_in_date}','${check_out_date}', ${price}, ${length}, ${guests},'${room_name}')`;
        console.log(query);
        pool.query(query, (err, result) => {

            if (err) { console.log(err); }
            res.status(200).send(result.rows);
        })

    } catch (error) {
        console.log(error);
    }

})


//Cancel a booking

app.delete(`/cancel/:booking_id`, async (req, res) => {

    const booking_id = req.params.booking_id;

    pool.query(`delete from bookings where booking_id=${booking_id}`, (err, res) => {
        if (err) { console.log(err); }

    })
})

/// modify a booking

app.put(`/update/:booking_id`, (req, res) => {

    const booking_id = req.params.booking_id;

    /// on hold, have to figure out how to handle availability

    pool.query()
})


//Testing

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})