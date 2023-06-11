const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  _id: false,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: loginSchema,
    required: true,
  }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;