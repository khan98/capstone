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

/*
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
getQuery(friendQuery,friendslistpage);*/


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

//Signs in user
app.post('/sign-in', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const user = req.body.user;
  const password = req.body.password;
  //console.log(user);
  //console.log(password);

  // Checks if there is a user with matching email and password
  conn.query(`SELECT * FROM Users WHERE username = "${user}" AND pass = "${password}"`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      //Does not return a reponse if there is no rows
      if (rows.length == 0) {
        res.status(400);
      }
      res.json(rows);
  });
  conn.end();
});

// Gets UserNo given a username
app.post('/getUserNo', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const user = req.body.user;
  //Gets the user number based on user name
  conn.query(`SELECT userNo FROM Users WHERE username = "${user}" ;`,
    (err, rows, fields) => {
      res.json(rows[0].userNo);
    });
    
    conn.end();
});

// Checks that username is not taken
app.post('/authenticateUser', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const user = req.body.user;
  console.log('au flag');
  //Checks if a user with the same username already exists
  conn.query(`SELECT * FROM Users WHERE username = "${user}";`,
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    if (rows.length == 0) {
      res.json(rows);
    }
    else{
      console.log(rows.length);
      res.status(400);
    }
});
conn.end();
});

//Signs up a new user
app.post('/sign-up', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const user = req.body.user;
  const password = req.body.password;
  const info = req.body.info;
  const favEvent = req.body.favEvent;
  

  // Inserts new user into table
  conn.query(`INSERT INTO Users ( username, pass, info, favEvent) VALUES ('${user}','${password}','${info}','${favEvent}')`,
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

//Deletes the users account
app.post('/deleteAccount', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const userNo = req.body.userNo;
  

  // Deletes the row corresponding to the users userNo
  conn.query(`DELETE FROM Users WHERE userNo = "${userNo}"`,
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


// request add friend
//request that another user be the users friend
app.post('/addFriend', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const userNo = req.body.userNo;
  const friendNo = req.body.FriendNo;
  
  conn.query(`INSERT INTO Friends (userNo, friendNo, accepted) VALUES ("${userNo}","${friendNo}", false );`,
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

// accept friend request
//accepts a friend request that has been sent to the user
app.post('/acceptFriend', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const userNo = req.body.userNo;
  const friendNo = req.body.FriendNo;
  conn.query(`INSERT INTO Friends (userNo, friendNo, accepted) VALUES ("${userNo}","${friendNo}", true );`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      else{
        //res.json(rows);
      }
    });

  conn.query(`UPDATE Friends SET accepted = true WHERE userNo = "${friendNo}" AND friendNo = "${userNo}" ;`,
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

//get friend requests
//returns a list of all the users who have sent a friend request which has not been accepted
app.post('/friendRequests', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const userNo = req.body.userNo;
  
  
  conn.query(`SELECT userNo from friends WHERE friendNo = "${userNo}" AND accepted = false ;`,
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

//friend list
//returns a list of all users who are the users friend
app.post('/friendRequests', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const userNo = req.body.userNo;
  
  
  conn.query(`SELECT friendNo from friends WHERE userNo = "${userNo}" AND accepted = True ;`,
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