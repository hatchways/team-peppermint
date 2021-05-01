const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    textVersions: {
      type: Object,
      default: {},
    },
    imageURL: {
      type: String
    },
  },
  { _id: false, timestamps: true }
);

const ConversationSchema = new mongoose.Schema({
  conversationID: {
    type: Number,
    required: true,
    index: true,
  },
  conversationTitle: {
    type: String,
    index: true,
  },
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
  lastMessage: {
    type: MessageSchema,
  }
});
ConversationSchema.index({ conversationID: 1, conversationTitle: 1 }, { unique: true, sparse: true })
const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = { Conversation, MessageSchema };
