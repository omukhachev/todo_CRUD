const Item = require('../models/item.model');
const jwt = require('jsonwebtoken');

exports.item_create = async (req, res) => {
    const uid = jwt.verify(req.body.token, 'privateKey').id;
    if (!uid) {
        res.send(
            {
                error: 'JWT is not valid',
            }
        )
    }
    const item = new Item(
        {
            user_id: uid,
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
    const uid = jwt.verify(req.body.token, 'privateKey').id;
    if (!uid) {
        res.send(
            {
                error: 'JWT is not valid',
            }
        )
    }
    try {
        res.send(await Item.find({ user_id: uid }));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update = async (req, res) => {
    const uid = jwt.verify(req.body.token, 'privateKey').id;
    try {
        await Item.updateOne(
            {
                user_id: uid,
                key: req.params.key,
            },
            { $set: req.body },
        );
        res.send(await Item.find({
            user_id: uid,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_update_all = async (req, res) => {
    const uid = jwt.verify(req.body.token, 'privateKey').id;
    try {
        await Item.updateMany(
            { user_id: uid },
            { isChecked: true },
        );
        res.send(await Item.find({
            user_id: uid,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
}

exports.item_delete = async (req, res) => {
    const uid = jwt.verify(req.body.token, 'privateKey').id;
    try {
        await Item.deleteOne(
            {
                user_id: uid,
                key: req.params.key
            },
        );
        res.send(await Item.find({
            user_id: uid,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.item_delete_checked = async (req, res) => {
    const uid = jwt.verify(req.body.token, 'privateKey').id;
    try {
        await Item.deleteMany(
            {
                user_id: uid,
                isChecked: true
            },
        );
        res.send(await Item.find({
            user_id: uid,
        }));
    }
    catch (e) {
        throw new Error(e);
    }
}