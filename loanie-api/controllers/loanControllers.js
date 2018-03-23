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

// const loanAddLike = (req, res) => {
//   const { id } = req.body;
//   // find a Loan with the "id"
//   // grab likes count, add 1 like to it.
//   // save Loan
//   Loan.findById(id)
//     .then(Loan => {
//       if (Loan === null) {
//         console.log("null Loan for " + id);
//         throw new Error();
//       }
//       ++Loan.likes;
//       Loan.save(Loan, (err, savedloan) => {
//         if (err) {
//           res.status(500).json(err);
//           return;
//         }
//         res.json(savedloan);
//       })
//     }).catch(err => res.status(422).json({ error: 'No Loan!' }));
// };

module.exports = {
  loanCreate,
  loansGetAll,
  loanGetById,
  loanEdit,
};
