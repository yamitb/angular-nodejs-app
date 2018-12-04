const express = require("express");

const router = express.Router();

//lecture 68



router.post("",(req,res,next) =>{
  const user = req.body;
  con.query(addUserQuery, [user.firstName,user.lastName,user.email,user.registered], function (err, result,fields) {
    if (err) throw err;
    res.status(201).json({
      message: 'User added successfully',
      userId: result.insertId
    });
  });
  
});



router.get("",(req, res, next)=> {
  con.query(getUsersquery, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({
      message: 'Users fetched succesfully!',
      users: result
    });
  });

  router.delete("/:id",(req, res, next) => {
  con.query(deleteUserQuery,[req.params.id], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({
       message: "User deleted!"
    });
  });
});

router.patch("",(req, res, next) => {
  const user = req.body;
  console.log(user.firstName);
  console.log(user.id);
  con.query(updateUserQuery,[user.firstName,user.lastName,user.email,user.id], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({
       message: "User updated!"
    });
  });
});
});


module.exports = router;