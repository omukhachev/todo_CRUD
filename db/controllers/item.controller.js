const Item = require('../models/item.model');

exports.item_create = async (req, res) => {
    const item = new Item(
        {
            text: req.body.text,
            key: req.body.key,
            ready: req.body.ready,
        }
    );
    try {
        await item.save(() => res.send('Item created: ' + item._id));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_get_data = async (req, res) => {
    try {
        const data = await Item.findById(req.params.id);
        res.send(data);
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update = async (req, res) => {
    try {
        await Item.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            () => res.send('Item updated')
        );
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_delete = async (req, res) => {
    try {
        await Item.findByIdAndRemove(
            req.params.id,
            () => res.send('Item deleted')
        );
    }
    catch (e) {
        throw new Error(e);
    }
};