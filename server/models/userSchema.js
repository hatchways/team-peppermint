const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  contacts: {
    type: Array
  },
  language: {
    type: String,
    required: false
  }
})


module.exports = UserSchema;