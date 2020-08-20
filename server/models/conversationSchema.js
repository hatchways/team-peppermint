const mongoose = require('mongoose');
const textSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { _id: false })
const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    textVersions: {
        type: [textSchema],
        default: []
    }
}, { _id: false })

const ConversationSchema = new mongoose.Schema({
    conversationID: {
        type: String,
        unique: true,
        required: true
    },
    users: {
        type: [String],
        required: true
    },
    messages: {
        type: [MessageSchema],
        default: []
    }
})
module.exports = ConversationSchema;
