const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const newConnection = require('./config');
const { connect } = require('http2');

const app = express();
const port = 80;

app.use(cors());

app.use(bodyParser.json());


///general db editing query function
function sendQuery (query,message) {
  let conn = newConnection();
  conn.connect();
  conn.query(query,(err,rows,fields) => {
      if (err)
          console.log(err);
      else
          console.log(message);
  });
  conn.end();
}

//general db select query function
function getQuery(query,page){
  app.get(page, (req, res) => {
    let conn = newConnection();
    conn.connect();
    conn.query(query, (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
  
      res.json(rows);
    }); 
  });
  conn.end();
}


////////////////////////////////////////////////
//note these are untested i may need to change there to include table referancing 
//event recomendation
const usernum = 1;
const erQuery = 'select * from EventList where (creator in (select friendNo from Friends where userNo = '+usernum+') or eventType = (select favEvent from Users where userNo = '+usernum+' ) )and location = (select location from Users where userNo = '+usernum+');'
const erPage = '/EventRecomendation'
getQuery(erQuery,erPage);

//friends list
const friendQuery = 'select username, info ,location from Users where userNo = (select frienNo from friends where userNo = '+usernum+');'
const friendslistpage = '/friendslist'
getQuery(friendQuery,friendslistpage);


app.get('/', (req, res) => {
  // Test DB connection
  let conn = newConnection();
  conn.connect();

  conn.query('SELECT * FROM Users', (err, rows, fields) => {
    if (err) {
      console.error(err);
    }

    res.json(rows);
  });

  conn.end();
});

app.get('/users', (req, res) => {
    let conn = newConnection();
    conn.connect();
    conn.query('SELECT * FROM Users',
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      else{
        res.send(rows);
      }
    });
  
    conn.end();
});

app.get('/londonEvents', (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query('SELECT * FROM Events WHERE location = "London"',
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      res.send(rows);
    }
  });

  conn.end();
});

app.get('/torontoEvents', (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query('SELECT * FROM Events WHERE location = "Toronto"',
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      res.send(rows);
    }
  });

  conn.end();
});

app.get('/niagaraEvents', (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query('SELECT * FROM Events WHERE location = "Niagara"',
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      res.send(rows);
    }
  });

  conn.end();
});



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})