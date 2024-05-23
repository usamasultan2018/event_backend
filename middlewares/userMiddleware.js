const jwt = require('jsonwebtoken')
require('dotenv').config();

const userMiddleware = (req,res,next)=>{
    const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token not found or invalid format" });
  }
    try{
        const token =  authorization.split(' ')[1];
        if(!token){
         return res.status(401).json({
             success:false,
             error:"Unauthorized"
         });}
     
         const decode = jwt.verify(token,process.env.JWT_SECRET);
         req.user = decode;
         next();  
        }
      catch(err){
         res.status(401).json({
             success:false,
              message:"Internal Server error",
             error:err.message
         });
      }   
}
module.exports = {userMiddleware,};