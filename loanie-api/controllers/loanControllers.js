const Loan = require("../models/loanModels");

const loanCreate = (req, res) => {
  const { userId, currentStatus, timestamp, loanManager } = req.body;
  const newLoan = new Loan({ userId, currentStatus, timestamp, loanManager });
  newLoan.save(newLoan, (err, savedloan) => {
    if (err) {
      console.log("err: ", err);
      res.status(500).json(err);
      return;
    }
    res.json(savedloan);
  });
};

const loansGetAll = (req, res) => {
  console.log("get all");
  Loan.find({})
    .then(loans => {
      res.json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByClientName = (req, res) => {
  const { userId } = req.body;
  Loan.find({})
    .where("userId")
    .equals(userId)
    .then(loans => {
      res.json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loansGetAllByManagerName = (req, res) => {
  console.log("get by manager name");
  const { loanManager } = req.body;
  Loan.find({})
    .where("loanManager")
    .equals(loanManager)
    .then(loans => {
      res.json(loans);
    })
    .catch(err => res.status(422).json(err));
};

const loanGetById = (req, res) => {
  console.log("get one");
  console.log(req);
  const { id } = req.params;
  Loan.findById(id)
    .then(singleLoan => {
      if (singleLoan === null) throw new Error();
      res.json(singleLoan);
    })
    .catch(err => res.status(422).json(err));
};

const loanEdit = (req, res) => {
  console.log("loan edit");
  const { userId, currentStatus, loanManager } = req.body;
  // find a single Loan
  // edit loan details
  // save Loan
  const { id } = req.params;
  Loan.findById(id)
    .then(Loan => {
      if (Loan === null) throw new Error();
      console.log(
        "id:",
        id,
        "userId:",
        userId,
        "currentStatus:",
        currentStatus,
        "loanManager:",
        loanManager
      );
      if (userId) Loan.userId = userId;
      if (currentStatus) Loan.currentStatus = currentStatus;
      if (loanManager) Loan.loanManager = loanManager;
      Loan.save(Loan, (err, savedloan) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json(savedloan);
      });
    })
    .catch(err => res.status(422).json({ error: "No Loan!" }));
};

const loanDelete = (req, res) => {
  // find a single Loan
  // delete loan
  const { id } = req.params;
  Loan.findByIdAndRemove(id)
    .then(Loan => {
      if (Loan === null) throw new Error();
      Loan.save(Loan, (err, savedloan) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json("Loan has been completely deleted!");
      });
    })
    .catch(err => res.status(422).json({ error: "No Loan!" }));
};

module.exports = {
  loanCreate,
  loansGetAll,
  loanGetById,
  loanEdit,
  loanDelete,
  loansGetAllByClientName,
  loansGetAllByManagerName,
};
