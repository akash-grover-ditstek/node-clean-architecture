const mongoose = require('mongoose');
const schema = require('./schema');

module.exports = class StudentDatabase {
  constructor() {
    return mongoose.model("users", schema);
  }
}
