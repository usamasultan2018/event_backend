const express= require("express");
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/./auth/registerRoutes');
const loginRoutes = require('./routes/./auth/loginRoutes');
const addEventRoutes = require('./routes/event/addEventRoutes');

app.use(bodyParser.json());

//PORT NUM
const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{

    res.status(200).json("The Event Management Application");
});
// routes 
app.use("/auth",registerRoutes);
app.use("/auth",loginRoutes);
app.use("/event",addEventRoutes);
app.listen(PORT,()=>{
console.log(`Server is running on PORT:${PORT}`);
});

