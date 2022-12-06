const newConnection = require('./config');

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

  //table creation

  const createusers = `CREATE TABLE Users (
    userNo int NOT NULL AUTO_INCREMENT,
    username varchar(255),
    pass varchar(255),
    info varchar(255),
    favEvent varchar(255),
    location varchar(255),
    PRIMARY KEY (userNo)
    );`;

const createfriends= `CREATE TABLE Friends (
    userNo int,
    friendNo int,
    accepted bool,
    PRIMARY KEY (userNo,friendNo),
    FOREIGN KEY (userNo) REFERENCES Users(userNo)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (friendNo) REFERENCES Users(userNo)
    ON DELETE CASCADE ON UPDATE CASCADE
    );`;

const createEvents = `CREATE TABLE EventList (
    eventNo int NOT NULL AUTO_INCREMENT,
    location varchar(255),
    eventType varchar(255),
    eventDate Datetime,
    maxAtendees int,
    creator int,
    PRIMARY KEY (eventNo),
    FOREIGN KEY (creator) REFERENCES Users(userNo)
    ON DELETE CASCADE ON UPDATE CASCADE
    );`;

const createattendance = `CREATE TABLE Eventattendance (
    eventNo int,
    userNo int,
    PRIMARY KEY (eventNo, userNo),
    FOREIGN KEY (eventNo) REFERENCES EventList(eventNo)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (userNo) REFERENCES Users(userNo)
    ON DELETE CASCADE ON UPDATE CASCADE
    );`;

    //drop tables
const dropevents = `DROP TABLE EventList;`;
const dropUsers = `DROP TABLE Users; `;
const dropFriends =` DROP TABLE Friends;`;
const dropattendance = `DROP TABLE Eventattendance; ` 

//populate tables
function popU(){
let populateUsers = `INSERT INTO Users ( username, pass, info, favEvent) VALUES `
for(i=1; i<10;i++)
{
    populateUsers += `('user`+i+`','password','info`+i+`','fav'),`
}
populateUsers += `('user`+11+`','password','info`+11+`','fav');`;
sendQuery(populateUsers,'users populated');
}

function popfriends(){
let populate = `INSERT INTO friends ( userNo,friendNo,accepted) VALUES `

for(i=2; i<5;i++)
    {
        populate += `(`+1+`,`+i+`,true),`;
        populate += `(`+i+`,`+1+`,true),`;
    }
    populate += `(`+1+`,`+9+`,false),`;
    populate += `(`+7+`,`+1+`,false);`;
 
sendQuery(populate,'friends populated');
}
    


//drop all

    //sendQuery(dropattendance,'attendance droped');
    //sendQuery(dropFriends,'friends droped');
    //sendQuery(dropevents,'events droped');
    //sendQuery(dropUsers,'users droped');

//create all
/*
    sendQuery(createusers, 'users created');
    sendQuery (createfriends,'friends created'); 
    sendQuery (createEvents,'events created');
    sendQuery (createattendance,'attendance created');
*/
//popU();
popfriends();
