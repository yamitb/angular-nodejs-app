

// con.connect(function(err){
//   if(err) throw err;
//   console.log("Connected!");

//   var queryCreateDb = "CREATE DATABASE IF NOT EXISTS db";
//   var queryCreateUsersTable = 
//   "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), email VARCHAR (255), PRIMARY KEY(id))";

//   var insertQuery = "INSERT INTO users (firstName, lastName, email) VALUES ('Yamit3e4243', 'Besso', 'yamit.besso3333@gmail.com')";

//   var query = "SELECT * FROM users";

//   var query1 = "SELECT * FROM users WHERE email = 'yamit.besso1111@gmail.com'"

//   //When query values are variables provided by the user, you should escape the values.This is to prevent SQL injections, which is a common web hacking technique to destroy or misuse your database.
//   //1 way 
//   var email = 'yamit.besso1111@gmail.com';
//   var query2 = "SELECT * FROM users WHERE email = " + mysql.escape(email);
//   //2 way
//   var email1 = 'yamit.besso3333@gmail.com';
//   var firstName = 'Yamit3e4243';
//   var query3 = "SELECT * FROM users WHERE email = ? AND firstName = ?";

//   con.query(queryCreateDb, function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });

//   con.query(queryCreateUsersTable, function (err, result) {
//     if (err) throw err;
//     console.log("Users table created");
//   });

//   /*con.query(insertQuery, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted to users table, ID:", result.insertId);
//   });*/

//   /*con.query(query, function (err, result,fields) {
//     if (err) throw err;
//     console.log(result);
//   });*/

//   /*con.query(query1, function (err, result,fields) {
//     if (err) throw err;
//     console.log(result);
//   });*/

//   //sql injection
//   /*con.query(query2, function (err, result,fields) {
//     if (err) throw err;
//     console.log(result);
//   });*/

//   //sql injection
//   con.query(query3, [email1,firstName], function (err, result,fields) {
//     if (err) throw err;
//     console.log(result);
//   });

// });