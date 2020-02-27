// Model for managing data
const sql = require('../config/db');

// User object constructor
const User = function (user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.created_at = new Date();
};

const UserUpdate = function (user) {
    this.id = user.id;
    this.name = user.name;
};

User.register = function (request, response) {
    // console.log(request);
    sql.query("INSERT INTO users SET ? ", request, function (err, res) {
        if (err) {
            let msg = "Something went wrong! Please try again";

            if (err.sqlMessage) {
                msg = err.sqlMessage;
            }
            response(msg, null);
        } else {
            response(null, res.insertId);
        }
    });
};

User.update = function (request, id, response) {
    sql.query("UPDATE users set ? WHERE id = " + id, request, function (err, res) {

        if (err) {
            let msg = "Something went wrong! Please try again";

            if (err.sqlMessage) {
                msg = err.sqlMessage;
            }
            response(msg, null);
        } else {
            response(null, res);
        }
    });
};

User.delete = function (id, response) {
    sql.query("DELETE FROM users WHERE id = ?", id, function (err, res) {
        if (err) {
            let msg = "Something went wrong! Please try again";

            if (err.sqlMessage) {
                msg = err.sqlMessage;
            }
            response(msg, null);
        } else {
            response(null, res);
        }
    });
};

User.findByEmail = function (email, response) {
    sql.query("SELECT * FROM users WHERE email = ?", email, function (err, res) {
        if (err) {
            response(err, null);
        } else {
            response(null, res);
        }
    });
};

User.list = function (name, response) {
    sql.query("SELECT * FROM users WHERE name IS NULL OR name LIKE '%" + name + "%'", function (err, res) {
        if (err) {
            response(err, null);
        } else {
            response(null, res);
        }
    });
};

module.exports = { User, UserUpdate };

