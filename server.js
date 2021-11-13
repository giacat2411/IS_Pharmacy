const express = require("express");
const mysql = require('mysql');

const PORT = process.env.PORT || 4000;

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// CONECTION TO MYSQL

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'pharmacy'
});

////////////////////////////
//          TEST          //
////////////////////////////

app.get("/api/tests", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

///////////////////////////
//          GET          //
///////////////////////////
// Form: /api/get/...

///// Cat /////
app.get('/api/get/doctors', (req, res) => {
  var sql = "SELECT * FROM DOCTOR";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({doctors: results});
  });
});

app.get('/api/get/drugs', (req, res) => {
  var sql = "SELECT * FROM DRUG";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({drugs: results});
  });
});

///// Phuc /////

///// Chanh /////

///// Dung /////

app.get('/api/get/treatment_turns', (req, res) => {
  var sql = "SELECT * FROM treatment_turn";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({treatment_turns: results});
  });
});

app.get('/api/get/work_schedules', (req, res) => {
  var sql = "SELECT * FROM work_schedule";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({work_schedules: results});
  });
});

app.get('/api/get/system_users', (req, res) => {
  var sql = "SELECT * FROM system_user";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({system_users: results});
  });
});



//////////////////////////////
//          UPDATE          //
//////////////////////////////
// Form: /api/update/...


///// Cat /////

///// Phuc /////

///// Chanh /////

///// Dung /////


//////////////////////////////
//          DELETE          //
//////////////////////////////
// Form: /api/delete/...


///// Cat /////

///// Phuc /////

///// Chanh /////

///// Dung /////

app.post('/api/delete/treatment_turns', (req, res) => {
  var sql = "DELETE FROM treatment_turn "
          + "WHERE id='"+req.body.id+"'";
          console.log(req);
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
});

//////////////////////////////
//          INSERT          //
//////////////////////////////
// Form: /api/insert/...


///// Cat /////

///// Phuc /////

///// Chanh /////

///// Dung /////

app.post('/api/insert/treatment_turns', function(req, res) {
  var sql = "INSERT "
          + "INTO treatment_turn(id, turn_time, health_issue, blood_pressure, heart_beat, therapy, diagnose, start_time, end_time, patient_phone, doctor_phone) "
          + "VALUES('"
          +   req.body.id+ "','" 
          +   req.body.turn_time + "','" 
          +   req.body.health_issue + "','"
          +   req.body.blood_pressure + "','"
          +   req.body.heart_beat + "','"
          +   req.body.therap + "','"
          +   req.body.diagnose + "','"
          +   req.body.start_time + "','"
          +   req.body.end_time + "','"
          +   req.body.patient_phone + "','"
          +   req.body.doctor_phone+"')";
  console.log(req);

  connection.query(sql, function (err, results) {
    if(err) throw err;
    res.json({news: results});
  });
});




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});