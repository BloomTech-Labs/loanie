const User = require("../models/userModels");
const stripe = require("stripe")("sk_test_NLhlfyaCgqopGcpBvhkDdHBd");
// const mongoose = require("mongoose");

// const STATUS_USER_ERROR = 422;

const userCreate = (req, res) => {
  const {
    name, userType, email, mobilePhone, acceptTexts, acceptEmails,
  } = req.body;
  const newUser = new User({
    name,
    userType,
    email,
    mobilePhone,
    acceptTexts,
    acceptEmails,
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
  const { token } = req.body;
  console.log(token);
  res.json("Authenticated!");
};

const usersGetAll = (req, res) => {
  User.find({})
    .then((users) => {
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
    .then((user) => {
      if (user === null) throw new Error();
      User.save(user, (err) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json("User has been completely deleted!");
      });
    })
    .catch(err => res.status(422).json({ error: "No User!", err }));
};

const userGetById = (req, res) => {
  // find a single User
  const { id } = req.params;
  console.log("id", id);
  User.findById(id)
    .then((user) => {
      if (user === null) throw new Error();
      else res.json(user);
    })
    .catch(err => res.status(422).json({ error: "No User!", err }));
};

const userEdit = (req, res) => {
  console.log("loan edit");
  const {
    name,
    userType,
    email,
    mobilePhone,
    acceptTexts,
    acceptEmails,
  } = req.body;
  // find a single User
  // edit user details
  // save User
  const { id } = req.params;
  User.findById(id)
    .then(() => {
      if (User === null) throw new Error();
      if (name) User.name = name;
      if (userType) User.userType = userType;
      if (email) User.email = email;
      if (mobilePhone) User.mobilePhone = mobilePhone;
      if (acceptTexts) User.acceptTexts = acceptTexts;
      if (acceptEmails) User.acceptEmails = acceptEmails;
      User.save(User, (err, saveduser) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json(saveduser);
      });
    })
    .catch(err => res.status(422).json({ error: "No Loan!", err }));
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
  userGetById,
  userEdit,
  userToken,
  stripeTransaction,
};
