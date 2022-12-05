
const mysql = require('mysql2');

function newConnection() {
    let conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass1',
        port: '3306',
        database: 'eventfldb'
    });
    return conn;
}

module.exports = newConnection;

