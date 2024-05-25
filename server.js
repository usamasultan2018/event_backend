const express= require("express");
const app = express();
const db = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require("././routes/authRoutes");
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

app.use(bodyParser.json());

//PORT NUM
const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{

    res.status(200).json("The Event Management Application");
});
// routes 
app.use("/auth",authRoutes);
app.use("/event",eventRoutes);
app.use('/user',userRoutes),
app.use('/password',passwordRoutes);
app.listen(PORT,()=>{
console.log(`Server is running on PORT:${PORT}`);
});

