const PORT = process.env.PORT || 4000;

const express = require("express");

const cookieParser = require('cookie-parser')
const sessions = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
var bcrypt = require('bcryptjs');
// const { ValueContainer } = require("react-select/dist/declarations/src/components/containers");
const curr = new Date();
// {this.state.current_day.split(' ').splice(1,3).join('/')}

////////////////////////////////////////////////////////////
////                  SESSION MANAGEMENT                  //
////////////////////////////////////////////////////////////
const ONEDAY = 24 * 60 * 60 * 1000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

var session = { user: { phone: '', role: 'Guest', firstname: '', img: '' } };

app.use(sessions({
  secret: "key",
  cookie: { expires: ONEDAY },
  user: {}, resave: false,
  saveUninitialized: true,
}));

// app.get('/api/new/session', (req, res) => {
//   req.session.regenerate();
//   console.log(req.session)
// });

app.get('/api/get/session', (req, res) => {
  // console.log(req.session)
  console.log(session)
  if (session)
    res.json(session.user)
  else res.json(session)
});

app.get('/api/destroy/session', (req, res) => {
  console.log('SESSION DESTROYED !')
  // req.session.destroy();
  // req.session.regenerate();
  session = { user: { phone: '', role: 'Guest', firstname: '', img: '' } };
});

app.get('/api/get/access', (req, res) => {
  sql = `SELECT * FROM system_user WHERE PHONE = ${req.query.phonenum}`;
  connection.query(sql, function (err, results) {
    if (results[0]) {
      if (bcrypt.compareSync(req.query.userpwd, results[0].pwd)) {
        session = req.session;
        session.user = results[0];
        // console.log(session.user)
        res.json({ user: results });
      } else {
        res.json({ msg: "Wrong login information!" })
      }
    } else {
      res.json({ msg: "Wrong login information!" })
    }

  });
}
);

app.get('/api/set/user', (req, res) => { session.user = req.query; res.json(session.user) });
app.post('/api/set/role', (req, res) => { session.user.role = req.body.role; });
// 
///////////////////////////////////////////////////////////
//                      END SESSION                      //
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//                        PAYMENT                        //
///////////////////////////////////////////////////////////
app.post('/payment_momo', (request, result) => {
  var partnerCode = "MOMO1CWC20211113";
  var accessKey = "YD5SpOGSm6vYt9Ln";
  var secretkey = "zIRAhf9xcKk369jFKQRWh3Ygtbi36x0V";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "Thanh toán cho HealthCare";
  var returnUrl = "http://localhost:3000/";
  var notifyUrl = "https://callback.url/notify";
  var amount = request.body.total;
  var requestType = "captureMoMoWallet"
  var extraData = "";

  var rawSignature = "partnerCode=" + partnerCode
    + "&accessKey=" + accessKey
    + "&requestId=" + requestId
    + "&amount=" + amount
    + "&orderId=" + orderId
    + "&orderInfo=" + orderInfo
    + "&returnUrl=" + returnUrl
    + "&notifyUrl=" + notifyUrl
    + "&extraData=" + extraData

  const crypto = require('crypto');
  var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    returnUrl: returnUrl,
    notifyUrl: notifyUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'vi'
  });

  const https = require('https');
  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/gw_payment/transactionProcessor',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  }

  const req = https.request(options, res => {
    res.setEncoding('utf8');
    res.on('data', (body) => {
      console.log('payUrl: ');
      console.log(JSON.parse(body).payUrl);
      result.json({ payUrl: JSON.parse(body).payUrl })
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  })

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  console.log("Sending....")
  req.write(requestBody);
  req.end();
})

app.post('/payment_zalopay', (request, result) => {
  const axios = require('axios').default;
  const CryptoJS = require('crypto-js');
  const config = {
    appid: "553",
    key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
    key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
  };

  const embeddata = {
    merchantinfo: ""
  };

  const items = [{
    itemid: "",
    itemname: "",
    itemprice: 0,
    itemquantity: 1
  }];

  const order = {
    appid: config.appid,
    apptransid: '211202_7242', // mã giao dich có định dạng yyMMdd_xxxx
    appuser: "HealthCare",
    apptime: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embeddata: JSON.stringify(embeddata),
    amount: parseInt(request.body.total),
    description: "Thanh toán đơn hàng cho HealthCare",
    bankcode: "zalopayapp",
  };

  const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  axios.post(config.endpoint, null, { params: order })
    .then(res => {
      console.log(res.data);
      result.json({ orderurl: res.data.orderurl })
    })
    .catch(err => console.log(err));
})
///////////////////////////////////////////////////////////
//                      END PAYMENT                      //
///////////////////////////////////////////////////////////

// CONECTION TO MYSQL

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'pharmacy'
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
app.get('/api/get/doctors-info', (req, res) => {
  var sql = "select * from doctor natural join system_user ;";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ doctors: results });
  });
});
app.get('/api/get/my-doctors-info', (req, res) => {
  var sql = "SELECT * FROM DOCTOR WHERE PHONE=" + req.query.phone;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ doctors: results });
  });
});
app.get('/api/get/nurse-info', (req, res) => {
  var sql = "  SELECT * FROM nurse JOIN system_user ON nurse.phone=system_user.phone;";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ nurses: results });
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


app.get('/api/get/prescribe_order', (req, res) => {
  var sql = " select medicine.id, medicine.created_date, patient_phone, concat(lastname,' ', firstname) as full_name,  sum(include.quantity * drug.price) as total, payment.id as payment_id"
    + " from (medicine join prescriptive_medicine on medicine.id = prescribe_id)"
    + " join treatment_turn on treatment_turn.id = treatment_id"
    + " join system_user on (patient_phone = phone) join include on (prescribe_id = medicine_id)"
    + " natural join drug left join payment on medicine.id = payment.medicine_id"
    + " group by medicine.id, created_date, patient_phone, firstname, lastname, payment.id;"

  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ orders: results });
  });
})

app.get('/api/get/myorders', (req, res) => {
  var sql = "select id, created_date, patient_phone, concat(lastname,' ', firstname) as full_name,"
    + " sum(include.quantity * drug.price) as total"
    + " from  (medicine join purchase_medicine on id = purchase_id)"
    + " join system_user on (patient_phone = phone) join include on (purchase_id = medicine_id)"
    + " natural join drug" + " where patient_phone= " + req.query.phone
    + " group by id, created_date, patient_phone, firstname, lastname;";
  console.log(sql)
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ orders: results });
  });
});

app.get('/api/get/myorders_prescribe', (req, res) => {
  var sql = " select medicine.id, medicine.created_date, patient_phone, concat(lastname,' ', firstname) as full_name,  sum(include.quantity * drug.price) as total, payment.id as payment_id"
    + " from (medicine join prescriptive_medicine on medicine.id = prescribe_id)"
    + " join treatment_turn on treatment_turn.id = treatment_id"
    + " join system_user on (patient_phone = phone) join include on (prescribe_id = medicine_id)"
    + " natural join drug left join payment on medicine.id = payment.medicine_id"
    + " where patient_phone = " + req.query.phone
    + " group by medicine.id, created_date, patient_phone, firstname, lastname, payment.id;"

  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ orders: results });
  });
})

app.get('/api/get/order_in_view', function (req, res) {
  var sql = "select purchase_id as id, concat(lastname, ' ', firstname) as fullname, dateofbirth, address, phone "
    + "from purchase_medicine join (patient natural join system_user) on (phone = patient_phone) "
    + "where purchase_id = " + req.query.orderID;
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ information: results });
  });
})

app.get('/api/get/order_prescribe_in_view', function (req, res) {
  var sql = "select  prescribe_id, concat(A.lastname, ' ', A.firstname) as fullname, A.dateofbirth, A.address, A.phone, concat(B.lastname, ' ', B.firstname) as doctor_name, treatment_turn.*"
    + " from prescriptive_medicine join treatment_turn on id = treatment_id "
    + " join system_user as A on patient_phone = A.phone "
    + " join system_user as B on doctor_phone = B.phone "
    + " where prescribe_id =  " + req.query.orderID;
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ information: results });
  });
})

app.get('/api/get/prescribe-info', function (req, res) {
  var sql = `select prescribe_id, doctor_phone from prescriptive_medicine join treatment_turn on (id=treatment_id) where prescribe_id= ${req.query.orderID};`
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    var sql2 = `select concat(lastname, ' ', firstname) as fullname from system user where phone=${results[0].doctor_phone}`
    connection.query(sql2, (err, result) => {
      if (err) throw err;
      res.json({ id: results[0].id, doctor: result[0].fullname });
    })
  });
})

app.get('/api/get/order_details', function (req, res) {
  var sql = "select * from include natural join drug where medicine_id = " + req.query.orderID;
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ order_details: results });
  });
})

app.get('/api/get/total_value', function (req, res) {
  var sql = "select created_date, sum(quantity * price) as total "
    + "from purchase_medicine join medicine on purchase_id = id join include on id = medicine_id "
    + "natural join drug "
    + "group by created_date"
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ data_statistic: results });
  });
})

app.get('/api/get/total_prescribe_value', function (req, res) {
  var sql = "select E.created_date, sum(E.price * E.quantity) as total"
    + " from (select * from prescriptive_medicine join medicine on prescribe_id = id"
    + " join include on prescribe_id = medicine_id natural join drug) as E"
    + " join payment on E.medicine_id = payment.medicine_id"
    + " group by E.created_date;"
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ data_statistic: results });
  });
})

app.get('/api/get/not_total_prescribe_value', function (req, res) {
  var sql = "select created_date, sum(price * quantity) as total"
    + " from prescriptive_medicine join medicine on prescribe_id = id"
    + " join include on prescribe_id = medicine_id natural join drug"
    + " where not exists (select * from payment where payment.medicine_id = prescribe_id)"
    + " group by created_date;"
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ data_statistic: results });
  });
})

app.get('/api/get/payment', function (req, res) {
  var sql = "SELECT * FROM PAYMENT WHERE MEDICINE_ID = " + req.query.medicine_id;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ payment: results });
  });
})

///// Phuc /////

app.get('/api/get/users', (req, res) => {
  var sql = `SELECT * FROM system_user`
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ users: results });
  });
});
app.get('/api/get/role', (req, res) => {
  const RoleList = ["Doctor", "Nurse", "Patient"]
  for (let i = 0; i < 3; i++) {
    sql = `SELECT * FROM ${RoleList[i]} WHERE PHONE = ${req.query.phonenum}`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      if (results[0]) {
        res.json({ role: RoleList[i], activate: results[0].activate });
        if (results[0].activate === undefined || results[0].activate === 1)
          session.user.role = RoleList[i];
        else session = { user: { phone: '', role: 'Guest', firstname: '', img: '' } };
      }
    });
  }
});

app.get('/api/get/nurse', (req, res) => {
  var sql2 = `SELECT * FROM NURSE`;
  connection.query(sql2, function (err, results) {
    if (results[0]) {
      res.json({ nurse: results })
    }
  });
});
app.post('/api/new/doctor', (req, res) => {
  var input = req.body.params;
  sql = `INSERT INTO SYSTEM_USER(phone, firstname, lastname, dateOfbirth, address, email,pwd,img) 
  VALUES ("${input.phone}","${input.name.split(' ').slice(0, -1).join(' ')}","${input.name.split(' ').slice(-1).join(' ')}","1999-3-26","","", 
  "$2a$10$07ROfkTeWSniyKIUZ.4YC.YpmY5Wwnk/lJ0B.aqjnmbrfSVxJ2DIq",
  "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png")`
  sql2 = `INSERT INTO DOCTOR VALUES ("${input.phone}","${input.spec}",${input.exp},1);`
  console.log(sql + '\n' + sql2)
  connection.query(sql, function (err, results) {
    if (!err) connection.query(sql2, (err, results) => {
      res.json({ msg: "Thêm thành công." })

    })
  })
});


app.post('/api/new/nurse', (req, res) => {
  var input = req.body.params;
  sql = `INSERT INTO SYSTEM_USER(phone, firstname, lastname, dateOfbirth, address, email,pwd,img)
   VALUES ("${input.phone}","${input.name.split(' ').slice(0, -1).join(' ')}","${input.name.split(' ').slice(-1).join(' ')}",
   "1999-3-26","","", "$2a$10$07ROfkTeWSniyKIUZ.4YC.YpmY5Wwnk/lJ0B.aqjnmbrfSVxJ2DIq",
   "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png")`
  sql2 = `INSERT INTO NURSE VALUES ("${input.phone}",null,1);`
  console.log(sql + '\n' + sql2)
  connection.query(sql, function (err, results) {
    if (err) throw err;
    connection.query(sql2, (err, results) => {
      res.json({ msg: "Thêm thành công." });
    }
    )
  })
});

app.post('/api/delete/HR', (req, res) => {
  var input = req.body.params;
  sql = `UPDATE ${input.role}  SET activate = 0 WHERE phone=${input.phone};`
  console.log(sql)
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ msg: "Ẩn thành công." })
  })
})
app.get('/api/get/info', (req, res) => {
  sql = `SELECT *, concat(lastname, " ", firstname) as fullname FROM system_user WHERE PHONE = ${req.query.phonenum};`;
  console.log(sql);
  connection.query(sql, function (err, results) {

    if (results) {
      res.json({ user: results[0] });
    } else {
      res.json({ msg: "Hồ sơ không tồn tại." })
    }
  });
}
);

app.get('/api/hash/pwd', (req, res) => {
  res.json({ phone: hashPassword(req.query.pwd) });
});


// app.get('/api/get/phuc', (req, res) => { console.log(session); res.json(session.user)});


app.get('/api/get/login', (req, res) => {
  var sql = `SELECT * FROM system_user where phone=${req.query.phone}`;
  connection.query(sql, function (err, results) {
    results[0].role = "Patient";
    res.json({ users: results });
    req.session.user = results[0]
  });
});

app.get('/api/get/patientInfo', (req, res) => {

  var sql = `SELECT * FROM patient where phone=${req.query.phone}`
  connection.query(sql, function (err, results) {
    res.json(results);
  });
}
)
app.get('/api/get/mytreatment', (req, res) => {
  var sql = `SELECT treatment_turn.*, prescriptive_medicine.*, concat(lastname, ' ', firstname) as fullname
  FROM treatment_turn left join prescriptive_medicine on id = treatment_id
      join system_user on doctor_phone = phone where patient_phone=${req.query.phone}`;
  console.log(sql)
  connection.query(sql, function (err, results) {
    res.json(results);
  });
})

app.get('/api/get/doctor_treatment', (req, res) => {
  var sql = `SELECT treatment_turn.*, prescriptive_medicine.*, concat(lastname, ' ', firstname) as fullname
  FROM treatment_turn left join prescriptive_medicine on id = treatment_id
      join system_user on doctor_phone = phone where doctor_phone=${req.query.phone}`;
  console.log(sql)
  connection.query(sql, function (err, results) {
    res.json(results);
  });
})
///// Chanh /////
app.get('/api/get/patient', (req, res) => {
  var sql = "SELECT * FROM patient";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ treatment_turns: results });
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
  var sql = "SELECT * FROM work_schedule JOIN SYSTEM_USER ON DOCTOR_PHONE=PHONE order by work_session desc;";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ work_schedules: results });
  });
});

app.get('/api/get/my_work_schedules', (req, res) => {
  console.log(req.query)
  var sql = "SELECT * FROM work_schedule WHERE DOCTOR_PHONE=" + req.query.phone;
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

app.get('/api/get/patients', (req, res) => {
  var sql = "SELECT * FROM patient";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ patients: results });
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

app.post('/api/update/treatment_turn_doctor', function (req, res) {
  var sql = "UPDATE TREATMENT_TURN SET "
    + "blood_pressure = " + req.body.blood_pressure + ", "
    + "heart_beat = " + req.body.heart_beat + ", "
    + "diagnose = '" + req.body.diagnose + "', "
    + "therapy = '" + req.body.therapy + "' "
    + "WHERE id = " + req.body.treatment_id + "; ";
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
})

///// Phuc /////
app.post('/api/post/TTSK', (req, res) => {
  const info = req.body.params.tempInfo;
  console.log(info)
  var sql = `UPDATE patient
        SET medical_history="${info.medical_history}",
            height=${info.height},
            weight=${info.weight},
            blood_type="${info.blood_type}", 
            medical_background="${info.medical_background}"
    WHERE phone=${req.body.params.phone}`
  console.log(sql)
  connection.query(sql, function (err, results) {
    res.json({ msg: "Thay đổi tình trạng sức khỏe thành công" })
  });
}
);
app.post('/api/post/info', (req, res) => {
  var sql = `UPDATE system_user 
  SET 
  firstname="${req.body.params.firstname}",
  lastname="${req.body.params.lastname}",
  address="${req.body.params.address}",
  email="${req.body.params.email}",
  img="${req.body.params.img}"
  WHERE phone=${req.body.params.phone};`
  console.log(sql);
  connection.query(sql, function (err, results) {
    res.json({ msg: "Thay đổi thông tin thành công!" })
  })
});
// dateofbirth="${req.body.params.dateofbirth}",
app.post('/api/post/pwd', (req, res) => {
  param = req.body.params;
  //encoding bcrypt 
  var sql = `SELECT pwd FROM system_user where phone=${req.body.params.phone}`
  connection.query(sql, (err, results) => {
    if (bcrypt.compareSync(req.body.params.pwd, results[0].pwd)) {
      const salt = bcrypt.genSaltSync(10);
      newpwd = bcrypt.hashSync(req.body.params.newpwd, salt);
      sql = `UPDATE SYSTEM_USER SET  pwd="${newpwd}"
  WHERE phone=${req.body.params.phone} `
      connection.query(sql, () => {
        res.json({ msg: "Đổi mật khẩu thành công!" })
      })
    } else {
      res.json({ msg: "Sai mật khẩu!" })
    }
  })
})
app.post('/api/post/newpwd', (req, res) => {
  var sql = `SELECT pwd,dateofbirth FROM system_user where phone=${req.body.params.phone}`;
  console.log(sql);

  connection.query(sql, (err, results) => {
    if (new Date(req.body.params.DOB).toLocaleDateString('vi') === (new Date(results[0].dateofbirth)).toLocaleDateString('vi')) {
      const salt = bcrypt.genSaltSync(10);
      newpwd = bcrypt.hashSync(req.body.params.pwd, salt);
      sql = `UPDATE SYSTEM_USER SET  pwd="${newpwd}"
                WHERE phone=${req.body.params.phone} `
      connection.query(sql, () => {
        res.json({ msg: "Đổi mật khẩu thành công" })
      })
    } else {
      res.json({ msg: "Sai thông tin!" })
    }
    // var sql = `UPDATE system_user SET email = ${req.body.params.pwd}
    //         WHERE phone=${req.body.params.phone}`
    // connection.query(sql, (err, results) => {
    //   if (err) throw err;
    //   console.log(req.body);
    //   res.json({ msg: "Đổi mật khẩu thành công" })
    // })
    //Go to ogin
  })
});


///// Chanh /////
app.post('api/update/treatment_turn', (req, res) => {
  var sql = `UPDATE patient
      SET turn_time=${req.query.turn_time},
          start_time=${req.query.start_time},
          end_time=${req.query.end_time},
          doctor_phone=${req.query.doctor_phone},
  WHERE id=${req.query.id}`
  connection.query(sql, function (err, results) {
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

app.post('/api/insert/schedule', (req, res) => {
  var input = req.body.params;
  var sql = "CALL ADD_SCHEDULE('"
    + input.phone + "', "
    + input.day + ", '"
    + input.session + "', '"
    + (new Date()).toISOString().split('T')[0] + "');"
  console.log(sql)
  connection.query(sql, function (err, results) {
    res.json({ patients: req.query });
  });
}
)

app.post('/api/set/end-schedule', (req, res) => {
  var input = req.body.params;
  var sql = `UPDATE work_schedule
      SET end_day='${(curr).toISOString().split('T')[0]}'
  WHERE doctor_phone=${input.phone} and  work_day=${input.work_day}
        and  work_session="${input.work_session}" and start_day = '${(new Date(input.start_day)).toLocaleDateString('vi').split('/').reverse().join('-')}';`
  console.log(sql)
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ msg: "Thành công" });
  });
}
)

// app.post('/api/update/work_schedule', (req, res) => {
//   input = req.body.params;
//   var sql = `UPDATE work_schedule SET doctor_phone=${input.doctor_phone}, day = ${input.day}, session=${input.session}
//   WHERE doctor_phone=${input.oldphone} and day=${input.oldday} and session =${input.oldsession}
//   `;
//   connection.query(sql, function (err, results) {
//     if (err) throw err;
//     res.json({ work_schedules: results });
//   });
// });

// app.post('/api/delete/work_schedule', (req, res) => {
//   var sql = "DELETE FROM work_schedule "
//     + "WHERE doctor_phone='" + req.body.doctor_phone + "'";
//   console.log(req);
//   connection.query(sql, function (err, results) {
//     if (err) throw err;
//     res.json({ news: results });
//   });
// });


///// Dung /////

app.post('/api/delete/treatment_turns', (req, res) => {
  var sql = "DELETE FROM treatment_turn "
    + "WHERE id='" + req.body.id + "'";
  console.log(req);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});

//////////////////////////////
//          INSERT          //
//////////////////////////////
// Form: /api/insert/...


///// Cat /////
app.post('/api/insert/prescribe_medicine', function (req, res) {
  var id = Math.floor(Math.random() * Math.pow(10, 12));
  const date = (new Date()).toISOString().split('T')[0];

  var sql = "INSERT INTO MEDICINE(id, created_date) VALUE (" + id + ",'" + date + "');"
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
  });

  sql = "INSERT INTO PRESCRIPTIVE_MEDICINE(prescribe_id, treatment_id) VALUE"
    + " (" + id + ", " + req.body.treatment_id + ");"
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
  });

  sql = "INSERT INTO INCLUDE(medicine_id, drug_name, quantity) VALUES";


  for (let i = 0; i < req.body.cart.length; i++) {
    sql += "( " + id + ",'" + req.body.cart[i].item.drug_name + "', " + req.body.cart[i].number + ") "
    if (i !== req.body.cart.length - 1) sql += ", ";
  }

  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
  });
})

app.post('/api/insert/momo_payment', function (req, res) {
  var id = Math.floor(Math.random() * Math.pow(10, 12));
  const date = (new Date()).toISOString().split('T')[0]
  var sql = "INSERT PAYMENT(id, method, created_date, medicine_id) VALUE"
    + "( " + id + ", 'MoMo doanh nghiệp', '" + date + "', " + req.body.medicine_id + ")"
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
})

app.post('/api/insert/momo_payment_nurse', function (req, res) {
  var id = Math.floor(Math.random() * Math.pow(10, 12));
  const date = (new Date()).toISOString().split('T')[0]
  var sql = "INSERT PAYMENT(id, method, created_date, nurse_phone, medicine_id) VALUE"
    + "( " + id + ", 'MoMo doanh nghiệp', '" + date + "', '" + req.body.phone + "', " + req.body.medicine_id + ")"
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
})

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

app.post('/api/insert/medicine', function (req, res) {
  var id = Math.floor(Math.random() * Math.pow(10, 12));
  var sql = "INSERT INTO MEDICINE(id, created_date) "
    + "VALUE (" + id + ", '" + (new Date()).toISOString().split('T')[0].toString() + "')"
  console.log(sql);
  connection.query(sql, function (err) {
    if (err) throw err;
  });

  sql = "INSERT INTO PURCHASE_MEDICINE(purchase_id, patient_phone) VALUE "
    + "(" + id + ", '" + req.body.phone + "')";
  console.log(sql);
  connection.query(sql, function (err) {
    if (err) throw err;
  });

  const cart = JSON.parse(req.body.cart);
  sql = "INSERT INTO INCLUDE(medicine_id, drug_name, quantity) VALUES "
  for (let i = 0; i < cart.length; i++) {
    sql += "(" + id + ", '" + cart[i].item.drug_name + "', " + cart[i].number + ")";
    if (i !== cart.length - 1) sql += ", "
  }
  console.log(sql);
  connection.query(sql, function (err) {
    if (err) throw err;
  });

  sql = "INSERT INTO PAYMENT(id, method, created_date, medicine_id) VALUE "
    + "( " + id + ", 'Zalo Pay', '" + (new Date()).toISOString().split('T')[0].toString()
    + "', " + id + ")";
  console.log(sql);
  connection.query(sql, function (err) {
    if (err) throw err;
  });
})

///// Phuc /////
app.post('/api/insert/regist', (req, res) => {
  console.log(req.body.params)
  const salt = bcrypt.genSaltSync(10);
  storedPwd = bcrypt.hashSync(req.body.params.pwd, salt);
  bcrypt.genSalt().then(salt => {
    bcrypt.hash(req.body.params.pwd, salt).then(hash => {
      storedPwd = hash;
    })
  })
  var sql = `SELECT * FROM SYSTEM_USER WHERE PHONE = ${req.body.params.phone};`;
  console.log(sql);

  const str = req.body.params.fullname;
  const lastname = str.split(' ').slice(0, -1).join(' ');
  const firstname = str.split(' ').slice(-1).join(' ');

  connection.query(sql, function (err, results) {
    if (results.length !== 0) res.json({ signal: -1, msg: "Tài khoản đã tồn tại" });
    else {
      sql = `INSERT INTO system_user (phone, firstname, lastname, dateofbirth, address, email, pwd, img) VALUES 
        ("${req.body.params.phone}","${firstname}","${lastname}",
        "${req.body.params.date}","${req.body.params.address}",
        "${req.body.params.email}","${storedPwd}", 
        "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png")`
      console.log(sql);
      connection.query(sql, function (err, results) {
        if (err) console.log(err);
        var sql2 = `INSERT INTO patient VALUES("${req.body.params.phone}","Không", 150,53,"O+","Không");`
        console.log(sql2);
        connection.query(sql2, function (err, result) {
          res.json({
            signal: 200,
            msg: `Đăng ký thành công! Mời bạn đăng nhập vào tài khoản`
          });
        });

      });
    }
    if (err) console.log(err);
  })


});
///// Chanh /////

///// Dung /////

app.post('/api/insert/treatment_turns', function (req, res) {
  var sql = "INSERT "
    + "INTO treatment_turn(id, turn_time, health_issue, blood_pressure, heart_beat, therapy, diagnose, start_time, end_time, patient_phone, doctor_phone) "
    + "VALUES('"
    + req.body.id + "','"
    + req.body.turn_time + "','"
    + req.body.health_issue + "',"
    + req.body.blood_pressure + ","
    + req.body.heart_beat + ",'"
    + req.body.therapy + "','"
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


