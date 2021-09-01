const express = require('express');
const UserController = require('./controller');
const UserRepository = require('./repository');

const userRoutes = (dependencies) => {
  const repository = new UserRepository(dependencies.db.users);
  const router = express.Router();
  const controller = UserController(repository);

  router.route('/')
    .get(controller.getUsers)
    .post(dependencies.multi.single('image'), controller.addUser)

  router.post('/update/:id', dependencies.multi.single('image'), controller.upUser)
  router.get('/del/:id', controller.delUser)
  return router;
}

module.exports = userRoutes;
