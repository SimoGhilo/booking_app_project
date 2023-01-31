const express = require('express');
const roomsRouter = express.Router();
const controller = require('./controller');

// get all locations

roomsRouter.get('/', controller.getRooms)

roomsRouter.get('/:hotel_name', controller.getRoomsByHotelName)

roomsRouter.get('/:hotel_id/:room_id', controller.getRoomByRoomId)
module.exports = roomsRouter;