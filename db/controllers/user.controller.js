const User = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


exports.user_create = async (req, res) => {
    const hash = crypto.createHmac('sha256', 'restart987');
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
        !currentUserExist[0] ? await user.save(() => res.send({ response: 'User created!' })) : res.send({ error: 'User already exists!' });

    }
    catch (e) {
        throw new Error(e);
    }
};

exports.user_get_data = async (req, res) => {
    try {
        const uid = jwt.verify(req.body.token, 'privateKey').id;
        const data = await User.findById(uid);
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

exports.user_auth = async (req, res) => {
    const hash = crypto.createHmac('sha256', 'restart987');
    try {
        const response = await User.findOne({login: req.body.login});
        if (!response) {
            res.send({
                success: false,
                error: 'User not found',
            });
            return;
        } else {
            const password = hash.update(req.body.password).digest('base64') === response.password;
            if (!password) {
                res.send({
                    success: false,
                    error: 'Incorrect password',
                })
                console.log(hash.update(req.body.password), ':', response.password);
                return;
            }
        }
        const token = jwt.sign({id: response._id}, 'privateKey')
        res.send({
            success: true,
            token: token,
        });
    }
    catch (e) {
        throw new Error(e);
    }
}