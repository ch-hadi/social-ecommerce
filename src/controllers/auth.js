const express_async_handler = require("express-async-handler");
const User = require("./../schemas/User");
const genrateToken = require("./../utils/Token");
// const bcrypt = require('bcryptjs')
const bcrypt = require("bcrypt");

const sign_up = express_async_handler(async (req, res) => {
  const full_name = req.body.full_name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const blood_group = req.body.blood_group;
  const gender = req.body.gender;
  const tell = req.body.tell;
  const user_location = req.body.location;
  const city = req.body.city

  if (!full_name || !email || !password || !username || !blood_group || !gender , !tell, !city) {
    console.log("error");
    res.send({ Error: "All fields are Requier.." });
    throw new Error("All fields are Requier..");
  }

  const userFound = await User.findOne({ email: email });

  if (userFound) {
    res.send("Error, User find  !");
  }
  const securedPassword = bcrypt.hashSync(password, 10);

  const user = await User.create({
    name: full_name,
    email: email,
    password: securedPassword,
    username: username,
    blood_group: blood_group,
    gender: gender,
    tell: tell,
    city:city,
    user_location:user_location
  });

  if (user) {
    let data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      blood_group:user.blood_group,
      gender: user.gender,
      tell: user.tell,
      location:user.user_location,
      city:user.city,
      token: genrateToken(user._id)
     
    };

    res.send({ data: data });
  }
});
const sign_in = express_async_handler(async (req, res) => {
  // res.send('Sign')
  // const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.send({ Error: "All fields are require..." });

    throw new Error("All fields are require...");
  }

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: genrateToken(user._id),
    });
  } else {
    res.send({ Error: "User not Found.." });
    throw new Error("User not Found..");
  }
});

const allUser = express_async_handler(async (req, res) => {
  // const keyword = req.query.search
  //   ? {
  //       $or: [
  //         { name: { $regex: req.query.search, $options: "i" } },
  //         { email: { $regex: req.query.search, $options: "i" } },
  //       ],
  //     }
  //   : {};

  const users = await User.find({});
  res.send(users);
});

module.exports = {
  sign_in,
  sign_up,
  allUser,
};
