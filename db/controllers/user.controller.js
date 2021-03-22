const User = require('../models/user.model');

exports.user_create = async (req, res) => {
    const user = new User(
        {
            login: req.body.login,
            password: req.body.password,
        }
    );
    try {
        await user.save(() => res.send('User created: ' + user._id));
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.user_get_data = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.send(data);
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.user_update = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            () => res.send('User updated')
        );
    }
    catch (e) {
        throw new Error(e);
    }
};

exports.user_delete = async (req, res) => {
    try {
        await User.findByIdAndRemove(
            req.params.id,
            () => res.send('User deleted')
        );
    }
    catch (e) {
        throw new Error(e);
    }
};