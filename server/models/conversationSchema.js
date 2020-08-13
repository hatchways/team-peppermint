const mongoose = require('mongoose');
const ConversationSchema = new mongoose.Schema({
    usersEmail: {
        type : Array,
        required: true
    },
    messages: {
        type : Array
    }
  }) 
  module.exports = ConversationSchema;
