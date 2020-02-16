const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/appModel');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
        // Match User
        User.find({ email: email }, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'No user found' });
            }

            // Match Password
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Wrong password' });
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}