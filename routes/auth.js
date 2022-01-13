const bcrypt = require("bcrypt");
const express = require("express");
const router = new express.Router();
const User = require("./../models/User");

router.get("/auth/signin", (req, res) => {
  res.render("signin");
});

router.get("/auth/signup", (req, res) => {
  res.render("signup");
});

router.post("/auth/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    console.log(newUser);
    const foundUser = await User.findOne({ email: newUser.email });
    if (foundUser) {
      res.redirect("/auth/signin");
    } else {
      const hashedPwd = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPwd;
      await User.create(newUser);
      res.redirect("/auth/signin");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
