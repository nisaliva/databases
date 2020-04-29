const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'meetup'
});

connection.connect();

const queries = [
    "DROP TABLE IF EXISTS Invitee",
    "create table Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))",
    "DROP TABLE IF EXISTS Room",
    "create table Room (room_no int, room_name varchar(25), floor_number int)",
    "DROP TABLE IF EXISTS Meeting",
    "create table Meeting (meeting_no int, meeting_title text, starting_time timestamp, ending_time timestamp, room_no int)"
]

for(let i in queries){
    connection.query(queries[i], (error, results, fields) => {
        if (error) throw error;
    });
};

const queriesInvitee = [
    "insert into Invitee values (1,'Sena','Ayse')",
    "insert into Invitee values (2,'Rana','Merve')",
    "insert into Invitee values (3,'Emir','Emre')",
    "insert into Invitee values (4,'Omer','Ali')",
    "insert into Invitee values (5,'Yasemin','Selahattin')"
];
const queriesRoom = [
    "insert into Room values (101,'First Room',1)",
    "insert into Room values (102,'Second Room',2)",
    "insert into Room values (103,'New Room',3)",
    "insert into Room values (104,'Big Room',4)",
    "insert into Room values (105,'Last Room',5)"
];
const queriesMeeting = [
    "insert into Meeting values (201,'Planning','2020-05-15 10:00','2020-05-15 12:00',3)",
    "insert into Meeting values (202,'Teamwork','2020-05-05 19:00','2020-05-05 21:00',2)",
    "insert into Meeting values (203,'Top Performance','2020-05-20 14:00','2020-05-20 16:00',1)",
    "insert into Meeting values (204,'Community','2020-05-17 08:30','2020-05-17 10:30',5)",
    "insert into Meeting values (205,'Vision','2020-05-23 15:00','2020-05-23 17:00',6)"
];
  
const allQueries = [queriesInvitee, queriesRoom, queriesMeeting];

allQueries.forEach(queries => {
    queries.forEach(item => {
        connection.query(item, (error, results, fields) => {     
            if (error) throw error;
            console.log("The insert is successful");
        });
    });
});

connection.end();
 
