const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createPool({
    // --- LOCAL ---
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'p455w0rd',
    database: 'todo'

    //  --- PRODUCTION - HEROKU ---
    // connectionLimit: 10,
    // host: 'us-cdbr-iron-east-04.cleardb.net',
    // user: 'ba028d9f20a5d1',
    // password: '8defe37e',
    // database: 'heroku_a1deab0614253af'
});

// connection.connect(function (err) {
//     // console.log('SQLERR:', err);
//     if (err) throw err;
// });

console.log('MYSQL CONNECTED..');

module.exports = connection;