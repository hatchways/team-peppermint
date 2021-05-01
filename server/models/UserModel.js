const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const ContactSchema = new mongoose.Schema(
  {
    conversationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      default: ''
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { _id: false }
)

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pictureURL: {
    type: {
      url: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    required: false,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  conversations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  }],
  language: {
    type: String,
    required: false,
  },
  isOnline: {
    tyep: Boolean,
    default: false
  }
});
UserSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next()
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    this.password = passwordHash
    next()
  })

})
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err)
      return cb(err)
    else {
      if (!isMatch)
        return cb(null, isMatch)
      return cb(null, this)
    }

  })
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
