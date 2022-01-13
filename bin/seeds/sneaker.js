require("dotenv").config();
require("../../config/mongodb");

const sneakerModel = require("../../models/Sneaker");

const tagModel = require("../../models/Tag");

const sneakers = [
  {
    name: "Nike",
    ref: "Air Force 1",
    size: 36,
    description: "Trendy",
    price: 150,
    category: "women",
    id_tags: null,
  },
  {
    name: "Adidas",
    ref: "Stan Smith",
    size: 40,
    description: "Parisian",
    price: 85,
    category: "men",
    id_tags: null,
  },
  {
    name: "Converse",
    ref: "Chuck 70",
    size: 38,
    description: "Melodie",
    price: 90,
    category: "kids",
    id_tags: null,
  },
];

(async function () {
  try {
    await sneakerModel.deleteMany();
    console.log(sneakers);

    const tags = await Promise.all([
      tagModel.findOne({ name: "Nike" }),
      tagModel.findOne({ name: "Adidas" }),
      tagModel.findOne({ name: "Converse" }),
    ]);
    console.log(tags);

    sneakers[0].id_tags = tags[0];
    sneakers[1].id_tags = tags[1];
    sneakers[2].id_tags = tags[2];

    const sneakersCreated = await sneakerModel.insertMany(sneakers);
    console.log(sneakersCreated);
    process.exit();
  } catch (e) {
    console.error(e);
  }
})();
