const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

studentSchema.pre('save',async function(next){
      
      const person=this;
      //hash the password only  if it has been modified for is new
      if(!person.isModified('password')) return next();
    try{
        //hash password generation
      const salt=await bcrypt.genSalt(10);
        //hash password
        const hashedPassword= await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;
        next();

    }catch(err){
       return next(err); 
    }
});
studentSchema.methods.comparePassword= async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err; 
    }
}
const Student=mongoose.model('Student',studentSchema);
module.exports=Student;



// {
    // "name":"Zohaib",
    // "lastname":"younis",
    // "age":21,
    // "email":"mr.zohaibyounus@gmail.com",
    // "class":"14th",
    // "rollno":84,
    // "mobile":"0324-5454800",
    // "address":"Kahna Nua Lahore",
    // "subject":"computer"
// }