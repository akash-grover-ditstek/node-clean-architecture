require('dotenv').config({path:__dirname+'/./../config/.env'})
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: 0,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user')(sequelize, Sequelize);


module.exports = db;