const express = require('express');
const hotelsRouter = express.Router();
const controller = require('./controller');


//get hotels by name

hotelsRouter.get('/:location', controller.getHotelsByLocationName)



module.exports = hotelsRouter;