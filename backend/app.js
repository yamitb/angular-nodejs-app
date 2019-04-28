const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRouters = require("./routes/user");
const itemsRouters = require("./routes/items");
const searchRouters = require("./routes/search");


const booksRouters = require("./routes/books");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkAuth = require("./middleware/check-auth");

const cors = require('cors');


const app = express();

app.use(cors());


var mysql = require('mysql');

var con = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "root",
  // database: "db"

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/images", express.static(path.join("backend/images")));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT, POST, PATCH, DELETE, OPTIONS");
  next();
});



/******************************************************************************* */

var queryCreateDb = "CREATE DATABASE IF NOT EXISTS db";
var queryCreateUsersTable =
  "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, email VARCHAR (255) NOT NULL,password VARCHAR (255) NOT NULL, joined VARCHAR (255), PRIMARY KEY(id),UNIQUE(email))";

  var queryCreateItemsTable =
  "CREATE TABLE IF NOT EXISTS items (id int NOT NULL AUTO_INCREMENT, type VARCHAR(255) NOT NULL, size VARCHAR(255) NOT NULL, color VARCHAR(255) NOT NULL,gender VARCHAR(255) NOT NULL,city VARCHAR(255) NOT NULL,imagePath VARCHAR(255) NOT NULL, userId int NOT NULL,PRIMARY KEY(id))";


  
//  INSERT INTO items (type, size, color,gender,city,userId) VALUES ("Skirt", "S", "Red","Female","Acco","32");

var queryCreateBooksTable =
  "CREATE TABLE IF NOT EXISTS books (id int NOT NULL AUTO_INCREMENT, title VARCHAR(255) NOT NULL, body VARCHAR(255) NOT NULL, userId int NOT NULL,PRIMARY KEY(id))";


var queryCreateImagesTable =
  "CREATE TABLE IF NOT EXISTS images (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), sensor VARCHAR(255), x VARCHAR (255), y VARCHAR (255),clipX VARCHAR (255),clipY VARCHAR (255),clipW VARCHAR (255),clipH VARCHAR (255), PRIMARY KEY(id))";

con.query(queryCreateDb, function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

con.query(queryCreateUsersTable, function (err, result) {
  if (err) throw err;
  console.log("Users table created");
});

con.query(queryCreateItemsTable, function (err, result) {
  if (err) throw err;
  console.log("Items table created");
});

con.query(queryCreateBooksTable, function (err, result) {
  if (err) throw err;
  console.log("Books table created");
});


con.query(queryCreateImagesTable, function (err, result) {
  if (err) throw err;
  console.log("Images table created");
});



var getUsersquery = "SELECT * FROM users";
var addUserQuery = "INSERT INTO users (firstName, lastName, email, joined) VALUES (?, ?, ?, ?)";
var deleteUserQuery = "DELETE FROM users WHERE id = ?";
var updateUserQuery = "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?";

app.post("/users",checkAuth, (req, res, next) => {
  const user = req.body;
  con.query(addUserQuery, [user.firstName, user.lastName, user.email, user.registered], function (err, result, fields) {
    if (err) throw err;
    res.status(201).json({
      message: 'User added successfully',
      userId: result.insertId
    });
  });

});



app.get("/users", (req, res, next) => {
  con.query(getUsersquery, function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).json({
      message: 'Users fetched succesfully!',
      users: result
    });
  });
});

  app.delete("/users/:id", (req, res, next) => {
    con.query(deleteUserQuery, [req.params.id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).json({
        message: "User deleted!"
      });
    });
  });

  app.patch("/users", (req, res, next) => {
    const user = req.body;
    console.log(user.firstName);
    console.log(user.id);
    con.query(updateUserQuery, [user.firstName, user.lastName, user.email, user.id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).json({
        message: "User updated!"
      });
    });
  });

  //console.log(req.query);
app.use("/user", userRouters);
app.use("/items", itemsRouters);
app.use("/search", searchRouters);
app.use("/books", booksRouters);
module.exports = app;










// var firstName = "777";
// var id = "1";
// var lastName = "444";
// var email = "hjdebghs@gmail.com";
// var addImageQuery = "INSERT INTO images (name, sensor, x, y,clipX,clipY,clipW,clipH) VALUES ('Frog','IKONOS','0','0','800','640','300','400')";

// var addImageQuery = "INSERT INTO images (name, sensor, x, y,clipX,clipY,clipW,clipH) VALUES ('Cat','OFEK','310','360','600','300','350','300')";



// con.query(addImageQuery, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });

  // con.query(imageQuery1,function (err, result) {
  //   if (err) throw err;
  //   res.status(200).json({
  //     message: 'Users fetched succesfully!',
  //     users: result
  //   });

  // var imageQuery = "SELECT * FROM images";
  // var array = ['IKONOS','OFEK'];
  //var array = 'IKONOS';



// app.get("/images",(req, res, next)=> {

//   con.query(imageQuery,function (err, result) {
//     if (err) throw err;
//     console.log("3333333");
//     console.log(result);
//     res.status(200).json({
//       message: 'Images fetched succesfully!',
//       images: result
//     });
//   });
// });












/*app.use((req, res, next)=> {
 res.send('Hello from express1133333331444!');
});*/




/*const users = [
  {
    id: 'jnhcdf874r89',
    firstName: 'Yamit',
      lastName: 'Besso',
      email: 'yamit@gmail.com',
      age: 29,
      address: {
        street: '62 sokolov st',
        city: 'Herzeliya'
      },
      image: '../../img/angular-img.jpg',
      isActive: true,
      balance: 100,
      registered: new Date('01/02/2018 08:30:00'),
      hide: true 
  },
  {
    id: 'jnhcdf874r89fdgvd',
    firstName: 'Maytav',
      lastName: 'san',
      email: 'maytav@gmail.com',
      age: 32,
      address: {
        street: '15 dizingof st',
        city: 'Tel Aviv'
      },
      image: '../../img/angular-img.jpg',
      isActive: true,
      balance: 300,
      registered: new Date('07/07/2018 06:30:00'),
      hide: true
  }
];*/
