const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/User.model");

const UserRouter = Router();

// API for Employee login/register
UserRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await UserModel.findOne({ email });

  if (result) {
    res.status(201).send("Email Already Exist");
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const newSignup = new UserModel({
          username: username,
          email: email,
          password: hash,
        });
        const saveSignup = newSignup.save();
        res.status(201).send("Signup Successfully");
      }
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
      res.status(201).send({ message: "Login Successfull", token });
    } else {
      res.status(500).send("Invalid Credential");
    }
  });
});

module.exports = {
  UserRouter,
};
