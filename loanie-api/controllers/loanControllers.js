const mongoose = require("mongoose");

const Loan = require("../models/loanModels");
const User = require("../models/userModels");

const loanCreate = (req, res) => {
  const {
    clientId, currentStatus, timestamp, loanManagerId, openLoan, assignments,
  } = req.body;

  // Verify that there are rows corresponding to clientId and loanManagerId in User collection.
  // Only after that, create new loan.
  User.find({
    _id: {
      $in: [mongoose.Types.ObjectId(clientId), mongoose.Types.ObjectId(loanManagerId)],
    },
  })
    .then((loans) => {
      if (loans.length !== 2) {
        res.status(422).json("clientId or loanManagerId not found in User collection.");
        throw new Error();
      } else {
        const newLoan = new Loan({
          clientId,
          currentStatus,
          timestamp,
          loanManagerId,
          assignments,
          openLoan,
        });
        newLoan.save(newLoan, (err, savedloan) => {
          if (err) {
            console.log("err: ", err);
            res.status(500).json(err);
            return;
          }
          res.status(200).json(savedloan);
        });
      }
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAll = (req, res) => {
  console.log("get all");
  Loan.find({})
    .then((loans) => {
      res.status(200).json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByClientId = (req, res) => {
  const { clientId } = req.body;
  Loan.find({ clientId })
    .then((loans) => {
      res.json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByManagerId = (req, res) => {
  console.log("get by manager id");
  const { loanManagerId } = req.body;
  Loan.find({ loanManagerId })
    .then((loans) => {
      res.json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loanGetById = (req, res) => {
  console.log("get one");
  console.log(req);
  const { id } = req.params;
  Loan.findById(id)
    .then((singleLoan) => {
      if (singleLoan === null) throw new Error();
      res.json(singleLoan);
    })
    .catch(err => res.status(422).json(err));
};

const loanEdit = (req, res) => {
  console.log("loan edit");
  const { clientId, currentStatus, loanManagerId } = req.body;
  // find a single Loan
  // edit loan details
  // save Loan
  const { id } = req.params;
  Loan.findById(id)
    .then(() => {
      if (Loan === null) throw new Error();
      // console.log(
      //   "id:",
      //   id,
      //   "clientId:",
      //   clientId,
      //   "currentStatus:",
      //   currentStatus,
      //   "loanManagerId:",
      //   loanManagerId,
      // );
      if (clientId) Loan.clientId = clientId;
      if (currentStatus) Loan.currentStatus = currentStatus;
      if (loanManagerId) Loan.loanManagerId = loanManagerId;
      Loan.save(Loan, (err, savedloan) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json(savedloan);
      });
    })
    .catch(err => res.status(422).json({ error: "No Loan!", err }));
};

// find by loan id and add new assignment to array
const loanCreateAssignment = (req, res) => {
  console.log("create loan assignement");
  const { loanId, assignment } = req.body;
  console.log(loanId, assignment);
  // find a single Loan
  // create loan assignment
  // save Loan
  Loan.findByIdAndUpdate(
    loanId,
    { $push: { assignments: assignment } },
    { safe: true, upsert: true },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

// find by loan id and add edit assignment in array
const loanEditAssignment = (req, res) => {
  console.log("edit loan assignement");
  const { loanId, assignmentId, assignment } = req.body;
  console.log(loanId, assignmentId, assignment);
  // find a single Loan
  // edit loan assignment
  Loan.findByIdAndUpdate(
    loanId,
    { $push: { assignments: { _id: assignmentId, text: assignment } } },
    { safe: true, upsert: true },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

// find by loan id and remove item in array
const loanDeleteAssignment = (req, res) => {
  console.log("edit loan assignement");
  const { loanId, assignmentId } = req.body;
  console.log(loanId, assignmentId);
  // find a single Loan
  // delete loan assignment
  Loan.findByIdAndUpdate(
    loanId,
    { $pull: { assignments: { _id: assignmentId } } },
    { safe: true, upsert: true },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        res.status(200).json(doc);
      }
    },
  );
};

const loanDelete = (req, res) => {
  // find a single Loan
  // delete loan
  const { id } = req.params;
  Loan.findByIdAndRemove(id)
    .then((loan) => {
      if (loan === null) throw new Error();
      Loan.save(loan, (err, savedloan) => {
        if (err) {
          res.status(500).json(err);
          return savedloan;
        }
        return res.json("Loan has been completely deleted!");
      });
    })
    .catch(err => res.status(422).json({ error: "No Loan!", err }));
};

module.exports = {
  loanCreate,
  loansGetAll,
  loanGetById,
  loanEdit,
  loanDelete,
  loansGetAllByClientId,
  loansGetAllByManagerId,
  loanEditAssignment,
  loanDeleteAssignment,
  loanCreateAssignment,
};
