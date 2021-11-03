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
  console.log("success");
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

// import userInfo from './user';
// app.post('/regist',function(req,res){
//   if (res.body.pwd==res.body.repwd){
//     var sql="INSERT INTO SYSTEM_USER (phone, firstname, dateofbirth, email, pwd) VALUES("+res.body.phone+","+res.body.name
//         +res.body.birth+","+res.body.pwd+")";
//   connection.query(sql,function(arr,results){
//     if (err)throw err;
//   })
//   }
//   else throw ("Mật khẩu chưa khớp!")
  
  
// });
app.get('/api/get/users', (req,res)=>{
  var sql = "SELECT * FROM SYSTEM_USER ";
  connection.query(sql, function(err, results) {
    try{
      
    res.json({users: results});
    
    }
    catch {
      throw (err);
    }
  });
});
app.get('/api/get/username', (req, res) => {
  var sql = "SELECT * FROM system_user";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({users: results});
  });
});

///// Chanh /////

///// Dung /////

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