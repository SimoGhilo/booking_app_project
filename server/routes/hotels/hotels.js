const express = require('express');
const hotelsRouter = express.Router();
const controller = require('./controller');

// get all hotels

hotelsRouter.get('/', controller.getHotels)


module.exports = hotelsRouter;