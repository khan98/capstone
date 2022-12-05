
const mysql = require('mysql2');

// youll need to change the username and password
function newConnection()
{
    let conn = mysql.createConnection({
        host:'127.0.0.1',
        user: 'root',
        password:'rootpass1',
        port: '3306',
        multipleStatements: true   
    });
    return conn;
}

const conn= newConnection();
const createDB = `create database eventfldb; use eventfldb;`
const dropDB = `drop database eventfldb;`

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

conn.query(dropDB,(err,rows,fields) => {
    if (err)
        console.log(err);
    else
        console.log('DB dropped');
});

conn.query(createDB,(err,rows,fields) => {
    if (err)
        console.log(err);
    else
        console.log('DB created');
});
 const createTable = `CREATE TABLE example(
    exampleno int,
    exampletext varchar(255),
    PRIMARY KEY(exampleno) 
    )`
const filltable = `INSERT INTO example (exampleno,exampletext) VALUES
 (5,"hello"),
 (12,"test");`


 conn.query(createTable,(err,rows,fields) => {
    if (err)
        console.log(err);
    else
        console.log('Table created');
});

conn.query(filltable,(err,rows,fields) => {
    if (err)
        console.log(err);
    else
        console.log('Table filled');
});


///general db editing query function
function sendQuery (connection, query,message) {
    connection.query(query,(err,rows,fields) => {
        if (err)
            console.log(err);
        else
            console.log(message);
    })
}


