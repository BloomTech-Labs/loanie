const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobilePhone: {
    type: Number,
  },
  acceptTexts: {
    type: Boolean,
  },
  acceptEmails: {
    type: Boolean,
  },
  subscriptionEndDate: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);

//add first and last name
