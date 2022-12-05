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
  conn.query('SELECT * FROM EventList WHERE location = "London"',
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
  conn.query('SELECT * FROM EventList WHERE location = "Toronto"',
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
  conn.query('SELECT * FROM EventList WHERE location = "Niagara"',
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

app.post('/sign-in', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const user = req.body.user;
  const password = req.body.password;
  console.log(user);
  console.log(password);

  // Get student with matching email and password
  conn.query(`SELECT * FROM Users WHERE username = "${user}" AND pass = "${password}"`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }

      if (rows.length == 0) {
        res.status(400);
      }
      res.json(rows);
  });
  conn.end();
});

// Get new UserNo
app.post('/getUserNo', (req, res) => {
  let conn = newConnection();
  conn.connect();

  conn.query('SELECT * FROM Users WHERE userNo = ( SELECT MAX(userNo) FROM Users) ;',
    (err, rows, fields) => {
      res.json(rows[0].userNo + 1);
    });
    
    conn.end();
});

app.post('/sign-up', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const user = req.body.user;
  const password = req.body.password;
  //const name = req.body.name;
  //const lastName = req.body.lastName;
  const info = req.body.info;
  const favEvent = req.body.favEvent;
  const number = req.body.number;

  // Get student with matching email and password
  conn.query(`INSERT INTO Users (userNo, username, pass, info, favEvent) VALUES (${number},'${user}','${password}','${info}','${favEvent}')`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      else{
        res.json(rows);
      }
    });

  conn.end();
});



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})