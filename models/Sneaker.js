const {model, Schema } = require('mongoose');

const sneakerSchema = new Schema({
    name: String,
    ref: String,
    size: Number,
    description: String,
    price: Number,
    category: {type : String, enum:['kids', "women", "men"]},
    id_tags: {type: Schema.Types.ObjectId, ref: 'label'}
})

const Sneaker = model('sneaker', sneakerSchema)

module.exports = Sneaker;