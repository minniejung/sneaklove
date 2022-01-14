const { model, Schema } = require("mongoose");

const sneakerSchema = new Schema({
  name: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: "61e045a3a585532431417209",
  },
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: { type: String, enum: ["kids", "women", "men"] },
  id_tags: { type: Schema.Types.ObjectId, ref: "label" },
  image: {
    type: String,
    default:
      "https://hypescrape.com/wp-content/uploads/2021/07/Wethenew-Sneakers-France-Air-Force-1-Shadow-Cashmere-CI0919-700-1.0_1200x_9555ea36-079a-4da9-a5d9-837846227464.png",
  },
});

const Sneaker = model("sneaker", sneakerSchema);

module.exports = Sneaker;
