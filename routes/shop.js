const router = require("express").Router();
const sneakerModel = require("../models/Sneaker");

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    res.render("products", {
      products: await sneakerModel.find(),
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
