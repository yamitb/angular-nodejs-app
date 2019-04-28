const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    }
    console.log("tokennnnnnn "+ token);
    next();
  }
  catch(error){
    console.log(error);
    res.status(402).json({message:"You are not authenticated!"});
  }
  

}