const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id_u: {type: String, required: true},
    text: {type: String, required: true},
    key: {type: Number, required: true},
    ready: {type: Boolean, requored: true},
});

module.exports = mongoose.model('Item', ItemSchema);