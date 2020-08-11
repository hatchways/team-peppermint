const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    users:{
        type : Array[User],
        required: true
    },
    messages:{
        type : Array[Message]
    }
  }) 
