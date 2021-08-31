const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: { type: String },
  email:     { type: String },
  password:     { type: String },
  image:     { type: String }
});
