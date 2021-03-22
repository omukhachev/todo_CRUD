const User = require('../models/user.model');

exports.test = (req, res) => {
    res.send('Hou got hello from three faces!');
};

exports.user_create = (req, res) => {
    const user = new User(
        {
            login: req.body.login,
            password: req.body.password,
        }
    );

    user.save((err) => {
        (err) ? res.send(err) : res.send('User created')
    });
};

exports.user_get_data = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.send(data)
        // if (err) throw new Error(err);
    } catch {
    
    }
};

exports.user_update = (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        (err, user) => {
            (err) ? res.send(err) : res.send('User updated');
        });
};

exports.user_delete = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        (err) ? res.send(err):res.send('User deleted');
    });

};