const express = require('express');
const hotelsRouter = express.Router();
const controller = require('./controller');

// get all hotels - Not in use at the moment - refer to controller.js

//hotelsRouter.get('/', controller.getHotels)

//get hotels by name

hotelsRouter.get('/:location', controller.getHotelsByLocationName)

// get hotel by id

//hotelsRouter.get('/:id', controller.getHotelById)




module.exports = hotelsRouter;