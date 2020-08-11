const mongoose = require('mongoose');
const invintationSchema = new mongoose.Schema({
    users:{
        type : Array[User],
        required: true
    },
    messages:{
        type : Array[Message]
    }
  }) 