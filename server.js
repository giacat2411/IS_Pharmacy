const express = require("express");
const mysql = require('mysql');

const PORT = process.env.PORT || 4000;

const app = express();

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

app.get('/api/doctors', (req, res) => {
  var sql = "SELECT * FROM DOCTOR";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({doctors: results});
  });
});

//////////////////////////////
//          UPDATE          //
//////////////////////////////


//////////////////////////////
//          DELETE          //
//////////////////////////////


//////////////////////////////
//          INSERT          //
//////////////////////////////


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});