const mongoose = require("mongoose");

// This table stores current status of all loans. There should always be exactly 1 row
// for a loan in this table. ClientId and loanManagerId columns are forgeing keys that refer
// to the unqique id of a user in User model.
const LoanSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  currentStatus: {
    type: String,
    required: true,
  },
  loanManagerId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Loan", LoanSchema);
