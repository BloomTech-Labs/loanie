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
    // .populate("userId", "userId")
    // .exec()
    .then(singleLoan => {
      if (singleLoan === null) throw new Error();
      res.json(singleLoan);
    })
    .catch(err => res.status(422).json(err));
};

// const loanAddComment = (req, res) => {
//   const { id, username, text } = req.body;
//   const comment = { username, text };
//   // find a single Loan
//   // grab comments array, add our comment to it.
//   // save Loan
//   Loan.findById(id)
//     .then(Loan => {
//       if (Loan === null) throw new Error();
//       const comments = Loan.comments;
//       comments.push(comment);
//       Loan.save(Loan, (err, savedloan) => {
//         if (err) {
//           res.status(500).json(err);
//           return;
//         }
//         res.json(savedloan);
//       })
//     }).catch(err => res.status(422).json({ error: 'No Loan!' }));
// };

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
  // loanAddComment,
  // loanAddLike,
};
