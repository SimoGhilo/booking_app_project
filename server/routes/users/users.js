const express = require('express');
const usersRouter = express.Router();
const controller = require('./controller');

// get all users

usersRouter.get('/', controller.getUsers)

// get user by id

usersRouter.get('/:id', controller.getUserById)

// create a new user

usersRouter.post('/', controller.createUser)


module.exports = usersRouter;