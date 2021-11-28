const express = require("express");

const mysql = require('mysql');

const PORT = process.env.PORT || 4000;

const app = express();
const bodyParser = require('body-parser');

const passport = require('passport')
const initPassport = require('./passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const TIMEOUT = 1 * 60 * 60;

app.use(express.urlencoded({ extended: false }));
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
        res.json({ doctors: results });
    });
});

app.get('/api/get/drugs', (req, res) => {
    var sql = "SELECT * FROM DRUG";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.json({ drugs: results });
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

app.use(cookieParser());
app.use(session({ secret: "key", cookie: { expires: TIMEOUT } }));
app.get("/", (req, res) => {
    if (req.session.count) {
        req.session = { user: {}, count: 0, resave: false }
    } else req.session.count++;
});

app.get('/api/get/users', (req, res) => {
    var sql = `SELECT * FROM system_user`
    connection.query(sql, function(err, results) {
    
        res.json({ users: results });
        
    });
    // res.json({ user: req.session.user })
});

app.post('api/post/regist', (req, res) => {
    console.log(req.session)
    var sql = `INSERT INTO system_user (phone, firstname, lastname, dateofbirth, address, email, pwd) VALUES 
        (${req.query.phone}," ${req.query.firstname}","${req.query.lastname}",
        "${req.query.dateofbirth}","${req.query.address}","${req.query.email}","${req.query.pwd}")`
    connection.query(sql, function(err, results) {
        alert("INTO")
    });

})

app.get('/api/get/phuc', (req, res) => { console.log(req.session) })

app.get('/api/set/user',(req,res)=>{
  console.log("success");
   req.session.user=
  {phone: req.query.phone, role:req.query.role}
  console.log(req.session)
})

app.get('/api/get/login', (req, res) => {
    var sql = `SELECT * FROM system_user where phone=${req.query.phone}`;
    connection.query(sql, function(err, results) {
        results[0].role="Patient";
        res.json({ users: results });
        req.session.user = results[0]
        
    });
});

app.get('api/get/patientInfo',(req,res)=>{
    var sql=`SELECT * FROM patient where phone=${req.query.phone}`
    connection.query(sql, function(err, results) {
        res.json({ patients: results });
    });
}
)

///// Chanh /////



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
app.post('api/update/patientInfo',(req,res)=>{
    var sql=`UPDATE patient
        SET medical_history=${req.query.medical_history},
            height=${req.query.height},
            weight=${req.query.weight},
            blood_type=${req.query.blood_type}, 
            medical_background=${req.query.medical_background}
    WHERE phone=${req.query.phone}`
    connection.query(sql, function(err, results) {
        res.json({ patients: req.query });
    });
}
)
app.post('api/post/forgetpwd',(req,res)=>{
    var sql=`UPDATE system_user SET pwd = ${req.query.pwd}
            WHERE phone=${req.query.phone}`
    connection.query(sql, (err,results)=>{
        if (err) throw err;
    })
    //Go to ogin
})
app.post('api/post/newpwd',(req,res)=>{
    var sql=`UPDATE system_user SET pwd = ${req.query.pwd}
            WHERE phone=${req.query.phone}`
    connection.query(sql, (err,results)=>{
        if (err) throw err;
    })
    //Go to ogin
})
///// Chanh /////

app.post('/api/uplate/treatment_turns', (req, res) => {
  console.log(req);
  var sql=`UPDATE treatment_turn
        SET doctor_phone=${req.query.doctor_phone},
            start_time=${req.query.start_time},
            end_time=${req.query.end_time}
    WHERE id=${req.query.id}`
    console.log(sql); 
    connection.query(sql, function (err, results) {
      res.json({ msg: "done" })
    });
})
// lát tự check file signup + profile của this, xem cách truyền param, truyền y chang vậy. v lên API update/info. truy vấn y chang v
// req.body.params.phone gì gì đó
// t đi sửa mấy lỗi kia đã
//DATA bị sai, truy vấn bằng req.qurey.... là sai. giờ phải console.log cái req. tìm vị trí của cai1 doctor phone ->>> truyền lại data
//Làm dùm thử 
///// Dung /////


//////////////////////////////
//          DELETE          //
//////////////////////////////
// Form: /api/delete/...


///// Cat /////

///// Phuc /////

///// Chanh /////
app.post('/api/delete/work_schedule', (req, res) => {
  var sql = "DELETE FROM work_schedule "
          + "WHERE doctor_phone='"+req.body.doctor_phone+"'";
          console.log(req);
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
});
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