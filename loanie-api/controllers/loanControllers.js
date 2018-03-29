const mongoose = require("mongoose");

const Loan = require("../models/loanModels");
const User = require("../models/userModels");

const loanCreate = (req, res) => {
  const {
    clientId, currentStatus, timestamp, loanManagerId,
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
      } else {
        const newLoan = new Loan({
          clientId,
          currentStatus,
          timestamp,
          loanManagerId,
        });
        newLoan.save(newLoan, (err, savedloan) => {
          if (err) {
            console.log("err: ", err);
            res.status(500).json(err);
            return;
          }
          res.json(savedloan);
        });
      }
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAll = (req, res) => {
  console.log("get all");
  Loan.find({})
    .then((loans) => {
      res.json(loans);
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
      console.log(
        "id:",
        id,
        "clientId:",
        clientId,
        "currentStatus:",
        currentStatus,
        "loanManagerId:",
        loanManagerId,
      );
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
};
