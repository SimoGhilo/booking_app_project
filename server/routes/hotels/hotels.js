const express = require('express');
const hotelsRouter = express.Router();
const controller = require('./controller');

// get all hotels - Not in use at the moment - refer to controller.js

//hotelsRouter.get('/', controller.getHotels)

//get hotels by name

hotelsRouter.get('/:location', controller.getHotelsByLocationName)

// get hotel by id

//hotelsRouter.get('/:id', controller.getHotelById)

/*  MACHO
           	
select r.room_id, r.room_name, r.hotel_id
from rooms r
where r.hotel_id = 2
and r.room_id not in ( select bookings.room_id from bookings where ('2023-02-12') between symmetric check_in_date and check_out_date
or ('2023-02-13') between symmetric check_in_date and check_out_date )
or r.hotel_id = 2 and r.room_id in (select bookings.room_id from bookings where check_in_date = '2023-02-13' or check_out_date = '2023-02-12') */


module.exports = hotelsRouter;