const express = require('express');
const userRoutes = require('./user/routes');

const Routes = (dependencies) => {
  const router = express.Router();
  router.use('/users', userRoutes(dependencies));
  return router;
}

module.exports = Routes;
