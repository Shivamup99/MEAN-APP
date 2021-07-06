const Book = require('../model/book') 
const User = require('../model/user')

exports.getBook = async(req,res)=>{
    try {
        let book = await Book.find()
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.getBookByID = async(req,res)=>{
    try {
        let book = await Book.findById({_id:req.params._id})
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.postBook = async(req,res)=>{
    let users = await User.findById(req.user)
    let book = await Book.findOne({book_name:req.body.book_name,author:req.body.author})
    if(book) return res.status(422).json({message:'Book is in list'})
    try {
        let book = new Book({
            book_name:req.body.book_name,
            author:req.body.author,
            book_type:req.body.book_type,
            rating:req.body.rating,
            desc:req.body.desc
        })
        await book.save();
        users.book.push(book._id)
        await users.save()
        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.putBook = async(req,res)=>{
    try {
        let book = await Book.findByIdAndUpdate({_id:req.params._id},{
            book_name:req.body.book_name,
            author:req.body.author,
            book_type:req.body.book_type,
            rating:req.body.rating,
            desc:req.body.desc
        },{new:true})
        await book.save();
        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.deleteBook = async(req,res)=>{
    try {
        let book = await Book.findByIdAndDelete({_id:req.params._id})
        if(book) {
            res.status(200).json({message:"book deleted"})
        } else{
            res.status(400).json({message:"book not found"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}