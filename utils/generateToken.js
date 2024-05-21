const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (user) => {
    const payload = {
      id: user._id,
      role: user.role
    };
  

    return jwt.sign(payload, process.env.JWT_SECRET);
  };
  
  module.exports = generateToken;