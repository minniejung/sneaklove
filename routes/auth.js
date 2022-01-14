const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
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
      req.flash("error", "Email already regristered");
      res.redirect("/auth/signin");
    } else {
      const hashedPwd = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPwd;
      await User.create(newUser);
      req.flash("success", "succeed :)");
      res.redirect("/auth/signin");
    }
  } catch (error) {
    next(error);
  }
});
router.post("/auth/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundedUser = await User.findOne({ email: email });
    console.log(foundedUser);
    if (!foundedUser) {
      req.flash("error", "Email not regristered");
      res.redirect("/auth/signup");
    } else {
      const pwd = bcrypt.compareSync(password, foundedUser.password);
      if (pwd) {
        req.flash("success", "Welcome :)");
        const objectUser = foundedUser.toObject();
        delete objectUser.password;
        req.session.currentUser = objectUser;
        res.redirect("/partials/dashboard_sneaker");
      } else {
        req.flash("warning", "wrong password");
        res.redirect("/auth/signin");
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/auth/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;
