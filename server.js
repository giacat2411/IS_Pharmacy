const express = require("express");
const mysql = require('mysql'); const PORT = process.env.PORT || 4000;

const app = express();
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const session = require('express-session');
var bcrypt = require('bcryptjs');

const ONEDAY = 24 * 60 * 60 * 10000;

// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// SESSION
app.use(cookieSession({
  name: 'session',
  keys: [/* secret keys */],

  maxAge: ONEDAY
}))

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
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ doctors: results });
  });
});

app.get('/api/get/drugs', (req, res) => {
  var sql = "SELECT * FROM DRUG";
  connection.query(sql, function (err, results) {
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

  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ orders: results });
  });
});

app.get('/api/get/order_in_view', function (req, res) {
  var sql = "select purchase_id as id, concat(lastname, ' ', firstname) as fullname, dateofbirth, address "
    + "from purchase_medicine join (patient natural join system_user) on (phone = patient_phone) "
    + "where purchase_id = " + req.query.orderID;
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ information: results });
  });
})

app.get('/api/get/order_details', function (req, res) {
  var sql = "select * from include natural join drug where medicine_id = " + req.query.orderID;
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({ order_details: results });
  });
})

app.get('/api/get/total_value', function(req, res) {
  var sql = "select created_date, sum(quantity * price) as total "
            + "from purchase_medicine join medicine on purchase_id = id join include on id = medicine_id "
            + "natural join drug "
            + "group by created_date"
  connection.query(sql, function(err, results) {
  if (err) throw err;
          res.json({data_statistic: results});
  });
})

///// Phuc /////


// app.use(session({
//   resave: true, secret: "key", cookie: { expires: TIMEOUT }, saveUninitialized: false,
// }));

app.get('/api/get/users', (req, res) => {
  var sql = `SELECT * FROM system_user`
  connection.query(sql, function (err, results) {
    res.json({ users: results });
  });
});
app.get('/api/get/role', (req, res) => {
  const RoleList = ["Doctor", "Nurse", "Patient"]
  for (let i = 0; i < 3; i++) {
    sql = `SELECT * FROM ${RoleList[i]} WHERE PHONE = ${req.query.phonenum}`;
    connection.query(sql, function (err, results) {
      if (results[0]){
        res.json({ role: RoleList[i] });}
    });
  }
});

app.get('/api/get/access', (req, res) => {
  console.log(req.query)
  sql = `SELECT * FROM system_user WHERE PHONE = ${req.query.phonenum}`;
  connection.query(sql, function (err, results) {
    
    if(results[0]){
      if (bcrypt.compareSync(req.query.userpwd, results[0].pwd)) {
      // console.log(results[0]);
      req.session.user=results;
      res.json({ user: results });
      }
      else{
  res.json({ msg: "Không thể đăng nhập." })}
    }
    else
  res.json({ msg: "Không thể đăng nhập." })
  });
}
);

app.get('/api/hash/pwd', (req, res) => {
  res.json({ phone: hashPassword(req.query.pwd) });
});


app.get('/api/get/phuc', (req, res) => { console.log(req.session) });

app.get('/api/set/user', (req, res) => {
  req.session.user = { phone: req.query.phone, role: req.query.role };
  console.log(req.session.user)
});

app.get('/api/destroy/session', (req, res) => {
  req.session.destroy();
});

app.get('/api/new/session', (req, res) => {
  req.session.regenerate();
});

app.get('/api/get/session', (req, res) => {
  res.json({ user: req.session.user })

});

app.get('/api/get/login', (req, res) => {
  var sql = `SELECT * FROM system_user where phone=${req.query.phone}`;
  connection.query(sql, function (err, results) {
    results[0].role = "Patient";
    res.json({ users: results });
    req.session.user = results[0]
  });
});

app.get('/api/encode', (req, res) => {
  var input = req.query.input;

})

app.get('api/get/patientInfo', (req, res) => {
  var sql = `SELECT * FROM patient where phone=${req.query.phone}`
  connection.query(sql, function (err, results) {
    res.json({ patients: results });
  });
}
)

///// Chanh /////
app.get('/api/get/patient', (req, res) => {
  var sql = "SELECT * FROM patient";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({treatment_turns: results});
  });
});
///// Dung /////

app.get('/api/get/treatment_turns', (req, res) => {
  var sql = "SELECT * FROM treatment_turn";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ treatment_turns: results });
  });
});

app.get('/api/get/work_schedules', (req, res) => {
  var sql = "SELECT * FROM work_schedule";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ work_schedules: results });
  });
});

app.get('/api/get/system_users', (req, res) => {
  var sql = "SELECT * FROM system_user";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ system_users: results });
  });
});



//////////////////////////////
//          UPDATE          //
//////////////////////////////
// Form: /api/update/...


///// Cat /////

app.post('/api/update/drug_quantity', function (req, res) {
  var sql = "UPDATE DRUG "
    + "SET REMAIN = " + req.body.quantity
    + " WHERE DRUG_NAME = '"
    + req.body.drug.drug_name + "'";
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});

///// Phuc /////
app.post('/api/post/TTSK', (req, res) => {
  info = req.body.params.info
  var sql = `UPDATE patient
        SET medical_history="${info.medical_history}",
            height=${info.height},
            weight=${info.weight},
            blood_type="${info.blood_type}", 
            medical_background="${info.medical_background}"
    WHERE phone=${req.body.params.phone}`
  console.log(sql)
  connection.query(sql, function (err, results) {
    res.json({ msg: "done" })
  });
}
);
app.post('/api/post/info', (req, res) => {
  var sql = `UPDATE system_user 
  SET 
  dateofbirth="${req.body.params.dateofbirth}",
  firstname="${req.body.params.firstname}",
  lastname="${req.body.params.lastname}",
  address="${req.body.params.address}",
  email="${req.body.params.email}"
  WHERE phone=${req.body.params.phone};`
  connection.query(sql, function (err, results) {
    res.json({ msg: "update info success" })
  })
});

app.post('/api/post/pwd', (req, res) => {
  param = req.body.params;
  //encoding bcrypt 
  var sql = `SELECT pwd FROM system_user where phone=${req.body.params.phone}`
  connection.query(sql, (err, results) => {
    if (bcrypt.compareSync(req.body.params.pwd, results[0].pwd)) {
      const salt = bcrypt.genSaltSync(10);
      newpwd = bcrypt.hashSync(req.body.params.password,salt);
      sql = `UPDATE SYSTEM_USER SET  pwd="${newpwd}"
  WHERE phone=${req.body.params.phone} `
      connection.query(sql, () => {
        res.json({ msg: "new pwd successful" })
      })
    } else {
      res.json({ msg: "Wrong password!" })
    }
  })
})
app.post('/api/post/newpwd', (req, res) => {
  var sql = `SELECT pwd,dateofbirth FROM system_user where phone=${req.body.params.phone}`
  connection.query(sql, (err, results) => {
    if (Date(results[0].dateofbirth) == Date(req.body.params.dateofbirth)) {
      if (bcrypt.compareSync(req.body.params.pwd, results[0].pwd)) {
        const salt = bcrypt.genSaltSync(10);
        newpwd = bcrypt.hashSync(req.body.params.pwd,salt);
        sql = `UPDATE SYSTEM_USER SET  pwd="${newpwd}"
                WHERE phone=${req.body.params.phone} `
        connection.query(sql, () => {
          res.json({ msg: "new pwd successful" })
        })
      } else {
        res.json({ msg: "Wrong password!" })
      }

    }else {
        res.json({ msg: "Wrong information!" })
      }
    // var sql = `UPDATE system_user SET email = ${req.body.params.pwd}
    //         WHERE phone=${req.body.params.phone}`
    // connection.query(sql, (err, results) => {
    //   if (err) throw err;
    //   console.log(req.body);
    //   res.json({ msg: "Đổi mật khẩu thành công" })
    // })
    //Go to ogin
  })});
  ///// Chanh /////
app.post('api/update/work_schedule',(req,res)=>{
  var sql=`UPDATE patient
      SET work_day=${req.query.work_day},
          work_session=${req.query.work_session},
  WHERE phone=${req.query.phone}`
  connection.query(sql, function(err, results) {
      res.json({ patients: req.query });
  });
}
)

app.post('api/update/treatment_turn',(req,res)=>{
  var sql=`UPDATE patient
      SET turn_time=${req.query.turn_time},
          start_time=${req.query.start_time},
          end_time=${req.query.end_time},
          doctor_phone=${req.query.doctor_phone},
  WHERE id=${req.query.id}`
  connection.query(sql, function(err, results) {
      res.json({ patients: req.query });
  });
}
)
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
      + "WHERE id='" + req.body.id + "'";
    console.log(req);
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.json({ news: results });
  });});

  //////////////////////////////
  //          INSERT          //
  //////////////////////////////
  // Form: /api/insert/...


  ///// Cat /////
  app.post('/api/insert/drug', function (req, res) {
    var sql = "INSERT INTO DRUG(drug_name, unit, price, remain) VALUE "
      + "('" + req.body.drug_name + "',"
      + "'" + req.body.unit + "',"
      + req.body.price + ","
      + req.body.remain + ")"

    console.log(sql);
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.json({ news: results });
    });
  });

  ///// Phuc /////
  app.post('/api/insert/regist', (req, res) => {
    console.log(req.body.params)
    const salt = bcrypt.genSaltSync(10);
    storedPwd=bcrypt.hashSync(req.body.params.pwd, salt);
    bcrypt.genSalt().then(salt=>{
      bcrypt.hash(req.body.params.pwd,salt).then(hash=>{
        storedPwd=hash;
      })
    })
    var sql = `INSERT INTO system_user (phone, firstname, lastname, dateofbirth, address, email,pwd) VALUES 
        (${req.body.params.phone},"${req.body.params.firstname}","${req.body.params.lastname}","${req.body.params.dateofbirth}","${req.body.params.address}","${req.body.params.email}","${storedPwd}")`
  connection.query(sql, function (err, results) {
      if (err) res.json({msg:"Đăng ký thất bại"});
      sql2 = `INSERT INTO patient VALUES(${req.body.params.phone},"Không", 150,53,"O+","Không");`
      connection.query(sql2, function (err,result){
res.json({
        msg: `Đăng ký thành công!
    Mời bạn đăng nhập vào tài khoản` });
      });
        
    });

  });
  ///// Chanh /////

  ///// Dung /////

  app.post('/api/insert/treatment_turns', function (req, res) {
    var sql = "INSERT "
      + "INTO treatment_turn(id, turn_time, health_issue, blood_pressure, heart_beat, therapy, diagnose, start_time, end_time, patient_phone, doctor_phone) "
      + "VALUES('"
      + req.body.id + "','"
      + req.body.turn_time + "','"
      + req.body.health_issue + "','"
      + req.body.blood_pressure + "','"
      + req.body.heart_beat + "','"
      + req.body.therap + "','"
      + req.body.diagnose + "','"
      + req.body.start_time + "','"
      + req.body.end_time + "','"
      + req.body.patient_phone + "','"
      + req.body.doctor_phone + "')";
    console.log(req);

    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.json({ news: results });
    });
  });


  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


