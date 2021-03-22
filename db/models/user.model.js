const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {type: String, required: true},
    login: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('User', UserSchema);