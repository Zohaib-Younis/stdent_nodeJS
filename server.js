const express=require('express');
const app=express();


//body parser
const bodyPerser=require('body-parser');
app.use(bodyPerser.json());//store in req.body
//importing db from db.js
const db=require('./db');
//importing studentSchema from mod


app.get('/',(req,res)=>{
    res.send("Welcome to student information portal..");
});

//post method to post data in mongodb
  const studentRoutes=require('./routes/studentRoutes');
    app.use('/student',studentRoutes);

    const parentRoutes=require('./routes/parentsRoutes');
    app.use('/parent',parentRoutes);

app.listen(3000,()=>{
    console.log("Server is started at port 3000");
});