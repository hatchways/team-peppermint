const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
<<<<<<< HEAD
    required: true
=======
    required: true,
    max: 255,
    min: 6
>>>>>>> dev
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true
=======
    max: 255,
    min: 6
>>>>>>> dev
  },
  password: {
    type: String,
    required: true,
<<<<<<< HEAD
=======
    max: 255,
>>>>>>> dev
    min: 6
  },
  contacts: {
    type: Array
<<<<<<< HEAD
  },
  language: {
    type: String,
    required: false
=======
>>>>>>> dev
  }
})


module.exports = UserSchema;