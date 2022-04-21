const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0125947boss',
    database: 'vacCenter'
});

module.exports = connection;