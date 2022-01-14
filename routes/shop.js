const router = require("express").Router();
const sneakerModel = require("../models/Sneaker");

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    res.render("products", {
      sneakers: await sneakerModel.find(),
    });
  } catch (e) {
    next(e);
  }
});

router.get("/sneakers/men", async (req, res, next) => {
  try {
    console.log("Is this working?");
    res.render("men", {
      products: await sneakerModel.find({ category: "men" }),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/women", async (req, res, next) => {
  try {
    res.render("women", {
      products: await sneakerModel.find({ category: "women" }),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/kids", async (req, res, next) => {
  try {
    res.render("kids", {
      products: await sneakerModel.find({ category: "kids" }),
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
