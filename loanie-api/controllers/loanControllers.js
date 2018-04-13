const Loan = require("../models/loanModels");

const loanCreate = (req, res) => {
  const {
    clientEmail, loanManagerId, amount, loanType, assignments,
  } = req.body;

  const newLoan = new Loan({
    clientEmail,
    loanManagerId,
    amount,
    loanType,
    assignments,
  });
  newLoan.save(newLoan, (err, savedloan) => {
    if (err) {
      console.log("err: ", err);
      res.status(500).json(err);
      return;
    }
    console.log(savedloan);
    res.status(200).json(savedloan);
  });
};

const loansGetAll = (req, res) => {
  console.log("get all");
  Loan.find({})
    .then((loans) => {
      res.status(200).json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByClientEmail = (req, res) => {
  const { clientEmail } = req.body;
  Loan.find({ clientEmail })
    .then((loans) => {
      //console.log(loans);
      res.json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByManagerId = (req, res) => {
  console.log("get by manager id");
  const { loanManagerId } = req.body;
  console.log("loanManagerId: ", loanManagerId);
  Loan.find({ loanManagerId })
    .then((loans) => {
      res.status(200).json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loanGetById = (req, res) => {
  console.log("get one");
  // console.log(req);
  const { id } = req.params;
  Loan.findById(id)
    .then((singleLoan) => {
      if (singleLoan === null) throw new Error();
      res.status(200).json(singleLoan);
    })
    .catch(err => res.status(422).json(err));
};

const loanEdit = (req, res) => {
  console.log("loan edit");
  const {
    currentStatus, openLoan, loanType, amount,
  } = req.body;
  // find a single Loan
  // edit loan details
  // save Loan
  const { id } = req.params;
  console.log(req.body);
  Loan.updateOne(
    { _id: id },
    {
      $set: {
        currentStatus,
        openLoan,
        loanType,
        amount,
      },
    },
    (err, savedloan) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      }
      res.json(savedloan);
      console.log("loansaved!");
    },
  ).catch(err => res.status(422).json({ error: "No Loan!", err }));
};

// find by loan id and add new assignment to array
const loanCreateAssignment = (req, res) => {
  console.log("create loan assignment");
  const { loanId, assignments } = req.body;
  console.log(loanId, assignments);
  // find a single Loan
  // create loan assignment
  // save Loan
  Loan.findByIdAndUpdate(
    loanId,
    { $push: { assignments } },
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
  const {
    loanId, assignmentId, text, phase, complete,
  } = req.body;
  console.log(loanId, assignmentId, text, phase, complete);
  // find a single Loan
  // edit loan assignment
  Loan.updateOne(
    { _id: loanId, "assignments._id": assignmentId },
    {
      $set: {
        "assignments.$.text": text,
        "assignments.$.phase": phase,
        "assignments.$.complete": complete,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        console.log("assignment edited successfully!");
        res.status(200).json(doc);
      }
    },
  );
};

// find by loan id and remove item in array
const loanDeleteAssignment = (req, res) => {
  console.log("edit loan assignment");
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

const loanCompleteAssignment = (req, res) => {
  console.log("loan assignment completed");
  const { loanId, assignmentId, complete } = req.body;
  console.log(loanId, assignmentId, complete);
  // find a single Loan
  // edit loan assignment
  Loan.updateOne(
    { _id: loanId, "assignments._id": assignmentId },
    {
      $set: {
        "assignments.$.complete": complete,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        console.log("assignment edited successfully!");
        console.log("doc: ", doc);
        res.status(200).json(doc);
      }
    },
  );
};

module.exports = {
  loanCreate,
  loansGetAll,
  loanGetById,
  loanEdit,
  loanDelete,
  loansGetAllByClientEmail,
  loansGetAllByManagerId,
  loanEditAssignment,
  loanDeleteAssignment,
  loanCreateAssignment,
  loanCompleteAssignment,
};
