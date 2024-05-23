const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
  };
  
  module.exports = generateToken;