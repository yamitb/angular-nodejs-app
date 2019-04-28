const express = require("express");
var db = require('../db.js');

const router = express.Router();

const checkAuth = require("../middleware/check-auth");


var con = db();

var getBooksquery = "SELECT * FROM books";
var addBookQuery = "INSERT INTO books (title, body, userId) VALUES (?, ?, ?)";
var deleteBookQuery = "DELETE FROM books WHERE id = ? AND userId = ?";
var updatePostQuery = "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?";

router.get("", (req, res, next) => {
  console.log("getttttttt books");
  con.query(getBooksquery, function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).json({
      message: 'Books fetched succesfully!',
      books: result
    });
  });
});

router.post("",checkAuth, (req, res, next) => {
  let book = req.body;
  console.log("book");
  console.log(book);
  console.log(req.userData);
  book.userId = req.userData.userId;
  con.query(addBookQuery, [book.title, book.body, book.userId], function (err, result, fields) {
    if (err) {
      return res.status(500).json({
        message: 'Creating a book failed!',
      });
    }
    console.log(result);
    res.status(201).json({
      message: 'Book added successfully',
      bookId: result.insertId,
    });
  });

});


  router.delete("/:id",checkAuth, (req, res, next) => {
    console.log("5555555555555555555");
    con.query(deleteBookQuery, [req.params.id,req.userData.userId], function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Delate a book failed!',
        });
      }
      if(result.affectedRows > 0){
        res.status(201).json({
          message: "Book deleted!"
        });
      }else{
        res.status(401).json({
          message: "Not authorized to delete this book!"
        });
      }
    });
  });

//   app.patch("/users", (req, res, next) => {
//     const user = req.body;
//     console.log(user.firstName);
//     console.log(user.id);
//     con.query(updatePostQuery, [user.firstName, user.lastName, user.email, user.id], function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       res.status(200).json({
//         message: "User updated!"
//       });
//     });
//   });


module.exports = router;