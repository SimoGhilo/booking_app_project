const express = require('express');
const roomsRouter = express.Router();
const controller = require('./controller');

// get all locations

roomsRouter.get('/', controller.getRooms)

roomsRouter.get('/:id', controller.getRoomsByHotelId)


module.exports = roomsRouter;