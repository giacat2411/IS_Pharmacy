const express = require("express");

const mysql = require('mysql');

const PORT = process.env.PORT || 4000;

const app = express();

const bodyParser = require('body-parser');

const passport=require('passport')
const initPassport=require('./passport')
const cookieParser=require('cookie-parser')
const session=require('express-session')

const TIMEOUT=1*60*60;

app.use(express.urlencoded({extended:false}));
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
// initPassport(passport)

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!",cookie:{expires: 60}})); // Week long cookie));
app.get("/", (req, res) => {
  if (req.session.count){
    req.session.user={};
    req.session.count=0;
  }
  else req.session.count++;
  });
app.get('/api/get/users', (req, res) => {
  res.data=req.session.user
});
app.post('api/post/regist',(req,res)=>{
  var sql = `INSERT INTO system_user VALUEs 
        (${req.body.phone}, ${req.body.firstname},${req.body.lastname},
        ${req.body.dateofbirth},${req.body.address},${req.body.email},${req.body.pwd}`
  try {
    connection.query(sql)
    console.log(req.body)
  }
  catch{
  res.redirect('localhost:3000/login')
}
})

app.get('/api/get/phuc', (req, res) => { console.log(req.session)})

app.get('/api/get/login', (req, res) => {

  var sql = `SELECT * FROM system_user where phone=1294333157`//${req.body.phone}`
  connection.query(sql, function(err, results) {
    res.json({users: results});
    
    // if (length(users)==0){
    //   res.send({message:"no account"})
    // }
    // else{
      //Check pwd
      //console.log(results)
      req.session.user=res.json(results[0])
      console.log(req.session)
    // }
  });
  // app.redirect('/home')
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