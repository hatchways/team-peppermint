const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    status:{ //0-pending, 1-accepted, 2-rejected
        type: Number,
        default: 0,
    },
    conversationID:{
        type: String
    }
},{ _id: false })

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
  pictureURL:{
    type: String,
    required:false
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  contacts: {
    type: [contactSchema],
    default:[]
  },
  language: {
    type: String,
    required: false
  }
})


module.exports = UserSchema;