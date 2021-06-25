const mongoose = require("mongoose")

const personalSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    birthDate:{
       type:Date,
       required:true
    },
   work:{
        type:String, 
        required:true
    },
    github:{
        type:String,
        required:true
    },
    linkdin:{
        type:String,
    },
    postCode:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
},{timestamps:true})

module.exports = mongoose.model('Personal',personalSchema)