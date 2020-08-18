const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    approved: {
      type: Boolean,
      required: true,
    },
    rejected: {
      type: Boolean,
      required: true,
    },
    from_user: {
      type: String,
      required: true,
      max: 255,
      min: 6
    },
    to_user: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    to_user_email: {
      type: String,
      required: false,
      max: 255,
      min: 6
    }
  })
  module.exports = InvitationSchema;