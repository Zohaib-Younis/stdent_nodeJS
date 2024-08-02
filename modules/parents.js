const mongoose=require('mongoose');

const parentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    ID:{
        type:String,
        required:true
    }
});

const Parent=mongoose.model('Parent',parentSchema);
module.exports=Parent;