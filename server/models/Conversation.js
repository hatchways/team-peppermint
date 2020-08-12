const mongoose = require('mongoose');
const ConversationSchema = new mongoose.Schema({
    users:{
        type : Array[User],
        required: true
    },
    messages:{
        type : Array[Message]
    }
  }) 
  module.exports = ConversationSchema;
