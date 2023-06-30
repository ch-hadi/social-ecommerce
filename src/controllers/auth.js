const express_async_handler = require('express-async-handler');
const User = require('./../schemas/User');
const { validationResult } = require('express-validator');
const genrateToken = require('./../utils/Token');
const jwt = require('jsonwebtoken');
// In-memory token store for revoked tokens
const revokedTokens = new Set();
// const bcrypt = require('bcryptjs')
const bcrypt = require('bcrypt');
const sign_up = express_async_handler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const full_name = req.body.full_name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // const blood_group = req.body.blood_group;
  const gender = req.body.gender;
  const tell = req.body.tell;
  // const user_location = req.body.location;
  const city = req.body.city;

  if (
    (!full_name || !email || !password || !username || !gender, !tell, !city)
  ) {
    console.log('error');
    res.send({ Error: 'All fields are Required..' });
    throw new Error('All fields are Required..');
  }

  const userFound = await User.findOne({ email: email });

  if (userFound) {
    res.send('Error, User exist wit this email!');
  }
  const securedPassword = bcrypt.hashSync(password, 10);
  // User.index({ "loc": "2dsphere" });
  const user = await User.create({
    name: full_name,
    email: email,
    password: securedPassword,
    username: username,
    // blood_group: blood_group,
    gender: gender,
    tell: tell,
    city: city,
    location: { type: 'Point', coordinates: [31.515054, 74.302857] },
  });

  if (user) {
    let data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      blood_group: user.blood_group,
      gender: user.gender,
      tell: user.tell,
      location: user.location,
      city: user.city,
      token: genrateToken(user._id),
    };

    res.send({ data: data });
  }
});
const sign_in = express_async_handler(async (req, res) => {
  // res.send('Sign')
  // const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!email || !password) {
    res.send({ Error: 'All fields are require...' });

    throw new Error('All fields are require...');
  }

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send({
      token: genrateToken(user),
    });
  } else {
    res.send({ Error: 'User not Found..' });
    throw new Error('User not Found..');
  }
});
const sign_out = express_async_handler(async (req, res) => {
  const token = req.headers.authorization;
  revokedTokens.add(token);

  // Token successfully revoked
  return res.status(200).json({ message: 'Token revoked.' });
});
const allUser = express_async_handler(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = {
  sign_in,
  sign_up,
  allUser,
  sign_out,
};
