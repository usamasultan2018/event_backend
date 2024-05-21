const express =  require("express");
const router = express.Router();
const User = require('../../models/user');
const  generateToken  = require('../../utils/generateToken');

router.post("/login",async(req,res)=>{
try{
    const {email,password} = req.body;
    
    const user = await User.findOne({email:email});

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "No user found with the provided email address.",
        });
    }
   const isPasswordMatched = await user.comparePassword(password);
   if (!isPasswordMatched) {
    return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
    });
}
   // Create a token with user info
   const payload = {
    id: user.id,
    username: user.username,
};
const token = generateToken(payload);

// Successful login response
return res.status(200).json({
    user:user.id,
    success: true,
    message: "Login successful! Welcome back.",
    token: token,
});
}
catch(e){return res.status(500).json({
    success: false,
    message: "Something went wrong during login. Please try again later.",
    error: error.message, // Include more details if needed
});  res.status(500).json(e.message);
}
});


module.exports = router;