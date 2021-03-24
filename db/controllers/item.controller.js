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
        const data = await Item.find({ user_id: req.params.user_id });
        res.send(data);
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update = async (req, res) => {
    try {
        await Item.updateOne(
            { key: req.params.key },
            { $set: req.body },
            () => res.send('Item updated')
        );
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update_all = async (req, res) => {
    try {
        await Item.updateMany(
            {},
            { ready: true },
            () => res.send('All is checked')
        );
    }
    catch (e) {
        throw new Error(e);
    }
}

exports.item_delete = async (req, res) => {
    try {
        await Item.deleteOne(
            { key: req.params.key },
            () => res.send('Item deleted')
        );
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_delete_checked = async (req, res) => {
    try {
        await Item.deleteMany(
            { ready: true },
            () => res.send('Completed items are deleted')
        );
    }
    catch (e) {
        throw new Error(e);
    }
}