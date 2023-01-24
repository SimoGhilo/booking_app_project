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
        expires: 60 * 60 * 24,
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
const pool = require('./database');
app.use('/users', usersRouter);


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

                    if (err) throw err

                    res.redirect('/login')

                })

            }
        })


    } catch (error) {
        console.error(error.message);
    }


})



//Testing

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})