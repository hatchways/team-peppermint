const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    textVersions: {
      type: Object,
      default: {},
    },
    image: {
      url: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  },
  { _id: false }
);

const ConversationSchema = new mongoose.Schema({
  conversationID: {
    type: String,
    unique: true,
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
});
module.exports = ConversationSchema;
