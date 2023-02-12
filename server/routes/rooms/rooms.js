const express = require('express');
const roomsRouter = express.Router();
const controller = require('./controller');

// get all locations

roomsRouter.get('/', controller.getRooms)

roomsRouter.get('/:hotel_name/:hotel_id/:arrival_date/:departure_date', controller.getRoomsByHotelName)

roomsRouter.get('/:hotel_id/:room_id', controller.getRoomByRoomId)
module.exports = roomsRouter;