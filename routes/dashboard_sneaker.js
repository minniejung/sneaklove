const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const tagsModel = require('../models/Tag')
const sneakerModel = require('../models/Sneaker')
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");
const uploader = require("./../config/cloudinary");

router.get('/prod-add',protectPrivateRoute, async (req, res)=>{
    try{
        res.render('products_add', {tags: await tagsModel.find()});
    }catch(err){
        console.error(err)
    }
    
})
router.post('/prod-add',uploader.single("image"), async(req, res, next)=>{
    console.log(req.file)
    try{
        const {name, ref, size, description, price,category, id_tags } = req.body;
        let  newPicture = req.file.path;
      const updated = await sneakerModel.create(
        {
          name,
          ref,
          description,
          size,
          price,
          category,
          id_tags,
          image: newPicture,
        }
      );
        res.redirect('/sneakers/collection')
    }catch(err){
        next(err)
    }
})
module.exports = router;
