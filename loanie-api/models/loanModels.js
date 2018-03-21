const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  currentstatus: {
    type: String,
    required: true
  },
  loanmanager: {
    username: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Loan', LoanSchema);