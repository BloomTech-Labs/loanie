const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const userCreate = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
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
    .select('username')
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
      res.json(users)
    })
    .catch(err => res.status(422).json(err));
};

module.exports = {
  userLogin,
  userCreate,
  usersGetAll
};