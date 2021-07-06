const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
       type:Number,
       required:true,
       unique:true
    },
    password:{
        type:String,
        require:true
    },
    personal:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Personal'
    }],
    book:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }],
    resetPasswordLink:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)