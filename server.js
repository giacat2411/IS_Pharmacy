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

app.get('/api/get/orders', (req, res) => {
  var sql = "select id, created_date, patient_phone, concat(lastname,' ', firstname) as full_name,"
      + " sum(include.quantity * drug.price) as total"
      + " from  (medicine join purchase_medicine on id = purchase_id)" 
      + " join system_user on (patient_phone = phone) join include on (purchase_id = medicine_id)"
      + " natural join drug"
      + " group by id, created_date, patient_phone, firstname, lastname;";

  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({orders: results});
  });
});

app.get('/api/get/order_in_view', function(req, res){
  var sql = "select purchase_id as id, concat(lastname, ' ', firstname) as fullname, dateofbirth, address "
    + "from purchase_medicine join (patient natural join system_user) on (phone = patient_phone) "
    + "where purchase_id = " + req.query.orderID;
  console.log(sql);
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({information: results});
  });
})

app.get('/api/get/order_details', function(req, res){
  var sql = "select * from include natural join drug where medicine_id = " + req.query.orderID;
  console.log(sql);
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({order_details: results});
  });
})

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
  console.log(sql);
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
app.post('/api/insert/drug', function(req, res) {
  var sql = "INSERT INTO DRUG(drug_name, unit, price, remain) VALUE "
          + "('" + req.body.drug_name + "',"
          + "'" + req.body.unit + "',"
          + req.body.price + ","
          + req.body.remain + ")"

  console.log(sql);
  connection.query(sql, function (err, results) {
    if(err) throw err;
    res.json({news: results});
  });
});

///// Phuc /////

///// Chanh /////

///// Dung /////

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});