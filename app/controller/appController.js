// Controller that accept input and performs validation  to pass to model 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../model/appModel');
const helper = require('../config/helper');

exports.register = function (req, res) {
    const { name, email, password } = req.body;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.status(500).send({ error: true, message: errors });
    } else {
        let newUser = new Model.User({ name, email, password });

        // Register with Hash password
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(500).send({ error: err });

            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) return res.status(500).send({ error: err });
                newUser.password = hash;

                Model.User.register(newUser, function (err, id) {
                    if (err) return res.status(500).send({ error: err });
                    res.status(200).send({ success: true, data: { id }, message: 'You are now registered and can sign in.' });
                });
            });
        });
    }
}

exports.login = function (req, res) {
    const { email, password } = req.body;

    Model.User.findByEmail(email, function (err, user) {
        if (err) return res.status(500).send({ error: 'Error on the server.' });
        if (!user) return res.status(404).send({ error: 'No user found.' });
        if (!user[0].password) return res.status(404).send({ error: 'No user found.' });

        bcrypt.compare(password, user[0].password, function (err, isMatch) {
            // console.log('ISMATCH: ', user[0].password, isMatch)
            if (err) return res.status(500).send({ error: 'Wrong password.' });

            if (isMatch) {
                let token = jwt.sign({ id: user.id }, helper.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ success: true, data: { ...user[0], token: token } });
            } else {
                return res.status(401).send({ error: 'Wrong password.' });
            }
        });

    });
}

exports.list = function (req, res) {
    const { name } = req.query;

    Model.User.list(name, function (err, users) {
        if (!users) return res.status(404).send({ error: 'No user found.' });

        res.status(200).send({ success: true, data: users });
    });
}

exports.update = function (req, res) {
    const { id, name } = req.body;

    req.checkBody('id', 'Id is required').notEmpty();
    req.checkBody('name', 'Name is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.status(500).send({ error: true, message: errors });
    } else {
        let newUser = new Model.UserUpdate({ id: id, name: name });

        Model.User.update(newUser, id, function (err, users) {
            res.status(200).send({ success: true, data: users });
        });
    }
}

exports.delete = function (req, res) {
    const { id } = req.body;

    req.checkBody('id', 'Id is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.status(500).send({ error: true, message: errors });
    } else {
        Model.User.delete(id, function (err, users) {
            res.status(200).send({ success: true, data: users });
        });
    }
}



