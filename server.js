const express= require("express");
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//PORT NUM
const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{

    res.status(200).json("The Event Management Application");
});
// routes 
app.listen(PORT,()=>{
console.log(`Server is running on PORT:${PORT}`);
});

