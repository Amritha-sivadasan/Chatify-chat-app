const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const asynchandler = require("express-async-handler");

const protect = asynchandler(async (req, res, next) => {
  console.log("hbfjsjsjjfs");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
     
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select("-password");
  

      next();
    } catch (error) {
      console.log(error.message);
      throw new Error("Not authorized token failed");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("Not authorized token failed");
  }
});

module.exports = protect;
