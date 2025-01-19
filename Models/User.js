import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
   
    roomnumber:{
        type:String,
        required:true,
        unique:true
    },
   
   

});

const user =mongoose.model("user",userSchema);
export default user;