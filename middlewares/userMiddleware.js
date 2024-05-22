const jwt = require('jsonwebtoken')
require('dotenv').config();

const userMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            success:false,
            error:"Token not found!"
        });
    }
    try{
        const token =  authHeader.split(' ')[1];
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
module.exports = userMiddleware;