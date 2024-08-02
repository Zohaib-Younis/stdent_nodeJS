const mongoose=require('mongoose');

//define schema for student information
const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    class:{
        type:String,
        required:true
    },
    rollno:{
        type:Number,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        enum:['computer','medical','math','physics'],
        required:true
    }
});

const Student=mongoose.model('Student',studentSchema);
module.exports=Student;



// {
//     "name":"Zohaib",
//     "lastname":"younis",
//     "age":21,
//     "email":"mr.zohaibyounus@gmail.com",
//     "class":"14th",
//     "rollno":84,
//     "mobile":"0324-5454800",
//     "address":"Kahna Nua Lahore",
//     "subject":"computer"
// }