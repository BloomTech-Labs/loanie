const mongoose = require("mongoose");

const User = require("../models/userModels");

const STATUS_USER_ERROR = 422;

const userCreate = (req, res) => {
  const {
    username,
    password,
    userType,
    email,
    mobilePhone,
    acceptTexts,
    acceptEmails,
    subscriptionEndDate,
  } = req.body;
  const newUser = new User({
    username,
    password,
    userType,
    email,
    mobilePhone,
    acceptTexts,
    acceptEmails,
    subscriptionEndDate,
  });
  newUser.save((err, savedUser) => {
    if (err) {
      res.status(500).json(JSON.stringify(err));
      return;
    }
    res.json(savedUser);
  });
};

const userLogin = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .select("username")
    .exec()
    .then(user => {
      if (user === null) {
        throw new Error();
      }
      res.json(user);
    })
    .catch(err => res.status(422).json({ error: err.message }));
};

const usersGetAll = (req, res) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(422).json(err));
};

const userDelete = (req, res) => {
  console.log("user delete");
  // find a single User account
  // delete user account
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(User => {
      if (User === null) throw new Error();
      User.save(User, (err, saveduser) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json("User has been completely deleted!");
      });
    })
    .catch(err => res.status(422).json({ error: "No User!" }));
};

const userGetById = (req, res) => {
  // find a single User
  const { id } = req.params;
  console.log("id", id);
  User.findById(id)
    .then(User => {
      if (User === null) throw new Error();
      else res.json(User);
    })
    .catch(err => res.status(422).json({ error: "No User!" }));
};

// const loanEdit = (req, res) => {
//   console.log("loan edit");
//   const { userId, currentStatus, loanManager } = req.body;
//   // find a single Loan
//   // edit loan details
//   // save Loan
//   const { id } = req.params;
//   Loan.findById(id)
//     .then(Loan => {
//       if (Loan === null) throw new Error();
//       console.log(
//         "id:",
//         id,
//         "userId:",
//         userId,
//         "currentStatus:",
//         currentStatus,
//         "loanManager:",
//         loanManager
//       );
//       if (userId) Loan.userId = userId;
//       if (currentStatus) Loan.currentStatus = currentStatus;
//       if (loanManager) Loan.loanManager = loanManager;
//       Loan.save(Loan, (err, savedloan) => {
//         if (err) {
//           res.status(500).json(err);
//           return;
//         }
//         res.json(savedloan);
//       });
//     })
//     .catch(err => res.status(422).json({ error: "No Loan!" }));
// };

module.exports = {
  userLogin,
  userCreate,
  usersGetAll,
  userDelete,
  userGetById,
};
