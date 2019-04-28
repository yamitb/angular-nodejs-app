const bcryptjs = require("bcryptjs");
var db = require('../db.js');
const jwt = require("jsonwebtoken");

var con = db();
var signupUserQuery = "INSERT INTO users (firstName, lastName, email, password,joined) VALUES (?, ?, ?, ?,?)";
var loginUserQuery = "SELECT * FROM users WHERE email = ?";

exports.createUser = (req, res, next) => {
  console.log("signuppppppppppp");
  const user = req.body;
  bcryptjs.hash(req.body.password, 10).then(hash => {
    con.query(signupUserQuery, [user.firstName, user.lastName, user.email, hash, user.registered], function (err, result, fields) {
      if (err) {
        res.status(500).json({
          message: 'Duplicate email',
        });
      } else {
        res.status(201).json({
          message: 'User added successfully',
          userId: result.insertId
        });
      }
    })
  });
}

exports.userLogin = (req, res, next) => {
  const user = req.body;

  con.query(loginUserQuery, [user.email], function (err, result, fields) {
    if (err || result.length == 0) {
      return res.status(401).json({
        message: 'Email not exists!',
      });
    }
    bcryptjs.compare(user.password,result[0].password,function(err,res1){
     if(err){
      return res.status(401).json({
        message: err,
      });
     }
     if(res1){
       const token = jwt.sign(
         { email: user.email, userId: result[0].id },
           process.env.JWT_KEY,
         { expiresIn: "1h" }
      );
      console.log("token");
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn:3600,
        user:{
          id: result[0].id,
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          email:result[0].email
        }
      })
     }else{
      return res.status(401).json({
        message: 'Invalid authentication credentials!',
      });
     }
    });

  });

}