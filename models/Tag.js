const {model, Schema } = require('mongoose');

const labelSchema = new Schema({
    label: String
})

const Label = model('label',labelSchema );

module.exports = Label;