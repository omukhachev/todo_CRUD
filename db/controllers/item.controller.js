const Item = require('../models/item.model');

exports.item_create = async (req, res) => {

    const item = new Item(
        {
            user_id: req.body.user_id,
            text: req.body.text,
            key: req.body.key,
            isChecked: req.body.isChecked,
        }
    );
    try {
        await item.save(() => res.send(item));
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

exports.item_update = async (req, res) => {
    try {
        await Item.updateOne(
            {
                user_id: req.params.user_id,
                key: req.params.key,
            },
            { $set: req.body },
        );
        res.send(await Item.find({
            user_id: req.params.user_id,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update_all = async (req, res) => {
    try {
        await Item.updateMany(
            { user_id: req.params.user_id },
            { isChecked: true },
        );
        res.send(await Item.find({
            user_id: req.params.user_id,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
}

exports.item_delete = async (req, res) => {
    try {
        await Item.deleteOne(
            {
                user_id: req.params.user_id,
                key: req.params.key
            },
        );
        res.send(await Item.find({
            user_id: req.params.user_id,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_delete_checked = async (req, res) => {
    try {
        await Item.deleteMany(
            {
                user_id: req.params.user_id,
                isChecked: true
            },
        );
        res.send(await Item.find({
            user_id: req.params.user_id,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
}