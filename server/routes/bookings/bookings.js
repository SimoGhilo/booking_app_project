const express = require('express');
const bookingsRouter = express.Router();
const controller = require('./controller');

// get all bookings

bookingsRouter.get('/', controller.getBookings);

// get a booking by user_id

bookingsRouter.get('/:user_id', controller.getBookingsByUserId);




module.exports = bookingsRouter;