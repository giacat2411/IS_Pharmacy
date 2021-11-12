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

//////////////////////////////
//          UPDATE          //
//////////////////////////////
// Form: /api/update/...


///// Cat /////

app.post('/api/update/drug_quantity', function(req, res) {
  var sql = "UPDATE DRUG "
          + "SET REMAIN = " + req.body.quantity 
          + " WHERE DRUG_NAME = '"
          +   req.body.drug.drug_name + "'";
  connection.query(sql, function (err, results) {
    if(err) throw err;
    res.json({news: results});
  });
});

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

//////////////////////////////
//          INSERT          //
//////////////////////////////
// Form: /api/insert/...


///// Cat /////

///// Phuc /////

///// Chanh /////

///// Dung /////

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});