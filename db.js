const mongoose=require('mongoose');
//define the mongodb connection url
const mongooseURL='mongodb://localhost:27017/student-data';

//setup mongo db connection
mongoose.connect(mongooseURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//get the default connection
//mongoose maintains a default connection OBJECT representing the mongo db connection

const db=mongoose.connection;

//listen events on mongodb server
db.on('connected',()=>{
    console.log("mongodb server is sucessfully connected");
});
db.on('disconnected',()=>{
    console.log("mongodb server is sucessfully disconnected");
});
db.on('error',()=>{
    console.log("Internal server error accours while connecting with mongodb server");
});


//default event listner for mongo data connection







