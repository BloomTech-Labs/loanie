const User = require("../models/userModels");
const stripe = require("stripe")("sk_test_NLhlfyaCgqopGcpBvhkDdHBd");
// const mongoose = require("mongoose");

// const STATUS_USER_ERROR = 422;

const userCreate = (req, res) => {
  const {
    name, userType, email, mobilePhone, acceptTexts, acceptEmails, token,
  } = req.body;
  const newUser = new User({
    name,
    userType,
    email,
    mobilePhone,
    acceptTexts,
    acceptEmails,
    UID: token,
    // password, // used to validate loan officer
  });
  console.log("Request Body:", req.body);
  newUser.save((err, savedUser) => {
    if (err) {
      res.status(500).json(JSON.stringify(err));
      console.log(err);
      return;
    }
    console.log(savedUser);
    res.status(200).json(savedUser);
  });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .select("email")
    .exec()
    .then((user) => {
      if (user === null) {
        throw new Error();
      }
      res.json(user);
    })
    .catch(err => res.status(422).json({ error: err.message }));
};

const userToken = (req, res) => {
  const { token, email } = req.body;
  console.log(token, email);
  User.findOne({ email })
    .then((user) => {
      if (token) user.UID = token;
      User.save(user, (err) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.status(200).json(user);
      });
    })
    .catch(err => res.status(422).json({ error: "User not found!", err }));
};

const usersGetAll = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(err => res.status(422).json(err));
};

const userDelete = (req, res) => {
  console.log("user delete");
  // find a single User account
  // delete user account
  const { token } = req.body;

  User.find(token)
    .remove()
    .exec((err, data) => {
      // data will equal the number of docs removed, not the document itself
      if (!data) {
        console.log(err);
        throw new Error();
      } else {
        res.status(200).json(data, "User Deleted!");
      }
    });
};

const userGetByUID = (req, res) => {
  // find a single User
  console.log("user get");
  const { token } = req.body;
  console.log("token:", token);
  User.findOne({ UID: token })
    .then((user) => {
      if (user === null) throw new Error();
      else res.json(user);
    })
    .catch(err => res.status(422).json({ error: "User not found!", err }));
};

const userEdit = (req, res) => {
  console.log("user edit");
  const {
    name, userType, email, mobilePhone, acceptTexts, acceptEmails, token,
  } = req.body;
  // find a single User
  // edit user details
  // save User
  console.log(token);
  console.log("req.body", req.body);
  User.findOne({ UID: token })
    .then((user) => {
      console.log("user", user);
      if (user === null) throw new Error();
      if (name) user.name = name;
      if (userType) user.userType = userType;
      if (email) user.email = email;
      if (mobilePhone) user.mobilePhone = mobilePhone;
      if (acceptTexts) user.acceptTexts = acceptTexts;
      if (acceptEmails) user.acceptEmails = acceptEmails;
      user.save(user, (err, saveduser) => {
        if (err) {
          console.log("error", err);
          res.status(500).json(err);
          return;
        }
        console.log("success", saveduser);
        res.status(200).json(saveduser);
      });
    })
    .catch(err => res.status(422).json({ error: "User not found!", err }));
};

// Stripe
const stripeTransaction = (req, res) => {
  let cost = 0;
  const { stripeToken, loanPlan } = req.body;
  // const mdata = {
  //   name: stripeToken.card.name,
  //   plan: loanPlan,
  //   brand: stripeToken.card.brand,
  //   last4: stripeToken.card.last4,
  // };
  if (loanPlan === "Single Loan") cost = 9.99;
  else if (loanPlan === "Full Year Subscription") cost = 99.99;
  else return res.json("error: No plan selected.");
  const int = Math.round(cost * 100);
  console.log("stripeToken", stripeToken);
  console.log("plan", loanPlan);
  console.log("cost integer", int);
  return stripe.charges.create(
    {
      amount: int,
      currency: "usd",
      description: "loanie purchase",
      // metadata: mdata,
      source: stripeToken.id,
    },
    (err, charge) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(charge);
    },
  );
  // res.json("Stripe Token Received!");
};

module.exports = {
  userLogin,
  userCreate,
  usersGetAll,
  userDelete,
  userGetByUID,
  userEdit,
  userToken,
  stripeTransaction,
};
