const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const tagsModel = require("../models/Tag");
const sneakerModel = require("../models/Sneaker");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");
const uploader = require("./../config/cloudinary");

router.get("/prod-add", protectPrivateRoute, async (req, res) => {
  try {
    res.render("products_add", { tags: await tagsModel.find() });
  } catch (err) {
    console.error(err);
  }
});
router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  console.log(req.file);
  try {
    const { name, ref, size, description, price, category, id_tags } = req.body;
    let newPicture = req.file.path;
    const updated = await sneakerModel.create({
      name,
      ref,
      description,
      size,
      price,
      category,
      id_tags,
      image: newPicture,
    });
    res.redirect("/sneakers/collection");
  } catch (err) {
    next(err);
  }
});

router.get("/prod-manage", async (req, res, next) => {
  try {
    res.render("products_manage", {
      sneakers: await sneakerModel.find().populate("user_id"),
    });
  } catch (e) {
    next(e);
  }
});

router.get("/product-edit/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    console.log(req.params.id);
    res.render("product_edit", {
      sneaker: await sneakerModel.findById(req.params.id),
      tags: await tagsModel.find(),
    });
  } catch (e) {
    next(e);
  }
});

router.post("/product-edit/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    await sneakerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect("/prod-manage");
  } catch (e) {
    next(e);
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    await sneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
