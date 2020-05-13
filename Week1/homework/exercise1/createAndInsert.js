const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
});

connection.connect();

connection.query('DROP DATABASE IF EXISTS meetup', function (err, result) {
    if (err) throw err;
    console.log('Database deleted');
});

connection.query('CREATE DATABASE meetup', function (err, result) {
    if (err) throw err;
    console.log('Database created');
});

connection.query('USE meetup', function (err, result) {
    if (err) throw err;
    console.log('Database connected');
});

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

const allTables = {
    Invitee: [
        {invitee_no:1, invitee_name:'Sena', invited_by:'Ayse'},
        {invitee_no:2, invitee_name:'Rana', invited_by:'Merve'},
        {invitee_no:3, invitee_name:'Emir', invited_by:'Emre'},
        {invitee_no:4, invitee_name:'Omer', invited_by:'Ali'},
        {invitee_no:5, invitee_name:'Yasemin', invited_by:'Selahattin'}
    ],
    Room: [
        {room_no:101, room_name:'First Room', floor_number:1},
        {room_no:102, room_name:'Second Room', floor_number:2},
        {room_no:103, room_name:'New Room', floor_number:3},
        {room_no:104, room_name:'Big Room', floor_number:4},
        {room_no:105, room_name:'Last Room', floor_number:5}
    ],
   
    Meeting: [
        {meeting_no:201, meeting_title:'Planning', starting_time:'2020-05-15 10:00', ending_time:'2020-05-15 12:00', room_no: 3},
        {meeting_no:202, meeting_title:'Teamwork', starting_time:'2020-05-05 19:00', ending_time:'2020-05-05 21:00', room_no: 2},
        {meeting_no:203, meeting_title:'Top Performance', starting_time:'2020-05-20 14:00', ending_time:'2020-05-20 16:00', room_no: 1},
        {meeting_no:204, meeting_title:'Community', starting_time:'2020-05-17 08:30', ending_time:'2020-05-17 10:30', room_no: 5},
        {meeting_no:205, meeting_title:'Vision', starting_time:'2020-05-23 15:00', ending_time:'2020-05-23 17:00', room_no: 6}
    ],
};


Object.keys(allTables).map(entity => {
    allTables[entity].map( item => {
        connection.query(`INSERT INTO ${entity} SET ? `, item);
    });
}),
  
connection.end();
 
