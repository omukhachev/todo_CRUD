const Item = require('../models/item.model');

exports.item_create = async (req, res) => {

    const item = new Item(
        {
            user_id: req.body.user_id,
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
        res.send(await Item.find({ user_id: req.params.user_id }));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update = async (req) => {
    try {
        await Item.updateOne(
            { key: req.params.key },
            { $set: req.body },
        );
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update_all = async () => {
    try {
        await Item.updateMany(
            {},
            { ready: true },
        );
    }
    catch (e) {
        throw new Error(e);
    }
}

exports.item_delete = async (req) => {
    try {
        await Item.deleteOne(
            { key: req.params.key },
        );
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_delete_checked = async () => {
    try {
        await Item.deleteMany(
            { ready: true },
        );
    }
    catch (e) {
        throw new Error(e);
    }
}