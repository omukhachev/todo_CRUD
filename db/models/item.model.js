const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    user_id: { type: String, required: true },
    text: { type: String, required: true },
    key: { type: Number, required: true },
    isChecked: { type: Boolean, requored: true },
});

module.exports = mongoose.model('Item', ItemSchema);