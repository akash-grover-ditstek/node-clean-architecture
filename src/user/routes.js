const express = require('express');
const UserController = require('./controller');
const UserDatabase = require('./dao/database');
const UserRepository = require('./repository');

const userRoutes = (dependencies) => {
  const database = new UserDatabase();
  const repository = new UserRepository(database);
  const router = express.Router();
  const controller = UserController( repository );

  router.route('/')
    .get(controller.getUsers)
    .post(dependencies.multi.single('image'),controller.addUser)

  return router;
}

module.exports = userRoutes;
