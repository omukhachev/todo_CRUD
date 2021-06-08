const User = require('../models/user.model');
const crypto = require('crypto');

const hash = crypto.createHmac('sha256','restart987');

exports.user_create = async (req, res) => {
    const user = new User(
        {
            login: req.body.login,
            password: hash.update(req.body.password).digest('base64'),
        }
    );
    try {
        const response = await User.find();
        const currentUserExist = response.map((item) => {
            return item.login
        }).filter(item => item === req.body.login);
        !currentUserExist[0] ? await user.save(() => res.send({response: 'User created!'})) : res.send({response:'User already exists!'});
        
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