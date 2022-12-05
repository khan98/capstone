
const mysql = require('mysql');

function newConnection() {
    let conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'EventFl'
    });
    return conn;
}

module.exports = newConnection;