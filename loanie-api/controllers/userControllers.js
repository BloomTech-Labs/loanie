const mongoose = require("mongoose");

const User = require("../models/userModels");

const STATUS_USER_ERROR = 422;

const userCreate = (req, res) => {
  const {
    firstName,
    lastName,
    password,
    userType,
    email,
    mobilePhone,
    acceptTexts,
    acceptEmails,
    subscriptionEndDate,
  } = req.body;
  const newUser = new User({
    firstName,
    lastName,
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
  const { email, password } = req.body;
  User.findOne({ email, password })
    .select("email")
    .exec()
    .then(user => {
      if (user === null) {
        throw new Error();
      }
      res.json(user);
    })
    .catch(err => res.status(422).json({ error: err.message }));
};

const userToken = (req, res) => {
  const { token } = req.body;
  console.log(token);
  res.json("Authenticated!");
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

const userEdit = (req, res) => {
  console.log("loan edit");
  const {
    firstName,
    lastName,
    password,
    userType,
    email,
    mobilePhone,
    acceptTexts,
    acceptEmails,
    subscriptionEndDate,
  } = req.body;
  // find a single User
  // edit user details
  // save User
  const { id } = req.params;
  User.findById(id)
    .then(User => {
      if (User === null) throw new Error();
      if (firstName) User.firstName = firstName;
      if (lastName) User.lastName = lastName;
      if (password) User.password = password;
      if (userType) User.userType = userType;
      if (email) User.email = email;
      if (mobilePhone) User.mobilePhone = mobilePhone;
      if (acceptTexts) User.acceptTexts = acceptTexts;
      if (acceptEmails) User.acceptEmails = acceptEmails;
      if (subscriptionEndDate) User.subscriptionEndDate = subscriptionEndDate;
      User.save(User, (err, saveduser) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json(saveduser);
      });
    })
    .catch(err => res.status(422).json({ error: "No Loan!" }));
};

module.exports = {
  userLogin,
  userCreate,
  usersGetAll,
  userDelete,
  userGetById,
  userEdit,
  userToken,
};
