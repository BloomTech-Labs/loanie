const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  currentStatus: {
    type: String,
    required: true
  },
  loanManager: {
    type: String,
    required: true
  },
  timeStamp: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Loan', LoanSchema);