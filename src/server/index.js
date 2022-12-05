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