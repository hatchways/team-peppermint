const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    approved: {
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