const mongoose = require('mongoose');

const LoanStatusSchema = new mongoose.Schema({
  currentstatus: {
    type: String,
    required: true
  },
  starttimestamp: {
    type: String,
    required: true
  },
  endtimestamp: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('LoanStatus', LoanStatusSchema);