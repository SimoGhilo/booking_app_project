const express = require('express');
const roomsRouter = express.Router();
const controller = require('./controller');

// get all locations

roomsRouter.get('/', controller.getRooms)

roomsRouter.get('/:hotel_name', controller.getRoomsByHotelName)


module.exports = roomsRouter;