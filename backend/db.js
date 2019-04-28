var mysql = require('mysql');

module.exports = function(){
  var con = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: process.env.MYSQL_DB_PW,
    // database: "db",

    // host: process.env.RDS_HOSTNAME,
    // user: process.env.RDS_USERNAME,
    // password: process.env.RDS_PASSWORD,
    // port: process.env.RDS_PORT,
    // database: "db",

    host: "aanrm5mnuv1lzg.ch4izhr8glp4.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "root1234",
    port: '3306',
    database: "db",


  });
  
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected1!");
  });

  return con;
}

