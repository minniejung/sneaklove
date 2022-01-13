require("dotenv").config();
require("../../config/mongodb");

const tagModel = require("../../models/Tag");

const tags = [
  {
    label: "Nike",
  },
  {
    label: "Adidas",
  },
  {
    label: "Converse",
  },
];

(async function () {
  try {
    await tagModel.deleteMany();
    const tagsCreated = await tagModel.insertMany(tags);
    console.log(tagsCreated.length, "Created");
    process.exit();
  } catch (e) {
    console.error(e);
  }
})();
