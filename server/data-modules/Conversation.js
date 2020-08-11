const mongoose = require('mongoose');
const invitationSchema = new mongoose.Schema({
    users:{
        type : Array[User],
        required: true
    },
    messages:{
        type : Array[Message]
    }
  }) 
