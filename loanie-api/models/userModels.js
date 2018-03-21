const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  usertype: {
    type: String,
    required: true
  }
  email: {
    type: String,
  }
  mobilephone: {
    type: Number,
  }
  accepttexts: {
    type: Boolean,
  }
  acceptemails: {
    type: Boolean,
  }
  subscriptionenddate: {
    type: Date,
    required: true
  }
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);