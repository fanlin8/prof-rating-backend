require('dotenv').config();
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send({
      message: "Email can not be empty."
    });
  }

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User not found."
      });
    };

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        auth: false,
        message: "Wrong password entered."
      });
    };

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }).catch(err => {
    return res.status(500).send({
      message: err || "Error on the server."
    });
  });
};

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

exports.register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Register content can not be empty."
    });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).send({
        message: "Email is already taken."
      });
    };

    console.log(req.body);

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create a User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      roles: ['normal-user']
    });

    // Save User in the database
    newUser.save()
      .then(user => {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while registering the User."
        });
      });
  });
};

// Get info for current user
exports.getMe = (req, res) => {
  User.findById(req.userId, { password: 0 }).then(user => {
    if (!user)
      return res.status(404).send({
        message: "User not found with id " + decoded.id
      });
    res.status(200).send(user);
  }).catch(err =>
    res.status(500).send({
      message: err || "There was a problem finding the user."
    }));
};