const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  verifiedUser :{
    type:Boolean,
    default:false,
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    default: []  // Initialize bookmarks as an empty array
  }],
  otp: { type: String } // New field for OTP
});
userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
try{
    //hashed password generation...
    const salt = await bcrypt.genSalt(10);
    // hashed password
    const hashedPassword = await bcrypt.hash(user.password,salt);
    user.password = hashedPassword;

    next();
    

}
catch(err){
return next(err);
}
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}
// Create a User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
