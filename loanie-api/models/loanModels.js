const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/loanie");

// This table stores current status of all loans. There should always be exactly 1 row
// for a loan in this table. ClientId and loanManagerId columns are forgeing keys that refer
// to the unqique id of a user in User model.
const AssignmentSchema = new mongoose.Schema({
  required: false,
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

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
  assignments: [AssignmentSchema],
});

module.exports = mongoose.model("Loan", LoanSchema);
