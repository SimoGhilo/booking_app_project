const express = require('express');
const locationsRouter = express.Router();
const controller = require('./controller');

// get all locations

locationsRouter.get('/', controller.getLocations)

locationsRouter.get('/:name', controller.getLocationByName)


module.exports = locationsRouter;