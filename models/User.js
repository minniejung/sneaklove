const {model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String
});

const User = model('user', userSchema);

module.exports = User;