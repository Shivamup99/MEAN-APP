const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    book_name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    book_type:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Book',bookSchema)