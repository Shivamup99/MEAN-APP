const User = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const {nodemailer} = require('../helper/index')
exports.getUser = async(req,res)=>{
    try {
        let user = await User.find().select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.getUserByID = async(req,res)=>{
    try {
        let user = await User.findById({_id:req.params._id}).populate({path:'personal'}).select('-password')
        .populate({path:'book'})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.postUser = async(req,res)=>{
  let user = await User.findOne({email:req.body.email})
  if(user) return res.status(400).json({message:"user exist"})
  try {
      let user = new User({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          mobile:req.body.mobile
      })
      let salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password,salt)
      await user.save()
      res.status(201).json({message:user})
  } catch (error) {
      res.status(500).json({message:error.message})
  }
}

exports.userLogin = async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(422).json({message:"email invalid"})
    let checkPassword = await bcrypt.compare(req.body.password,user.password )
    if(!checkPassword) return res.status(403).json({message:"invalid password"})
    try {
        let token = await jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"10h"})
        res.header('Authorization',token).status(200).json({_id:user._id , token:token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.putUser = async(req,res)=>{
    try {
        let user = await User.findByIdAndUpdate({_id:req.params._id},{
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile
        },{new:true})
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        let user = await User.findByIdAndDelete({_id:req.params._id})
        if(user) {
            res.status(200).json({message:"user deleted"})
        } else{
            res.status(400).json({message:"user not found"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


exports.forgotPassword=async(req,res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                message:'Email is wrong'
            })
        }
        const token = await jwt.sign({_id:user._id},process.env.SECRET_KEY,{ expiresIn: 60 * 60 * 24 * 10 })
        await user.updateOne({user:user._id,resetPasswordLink : token})
    
        const templateEmail ={
            from:'shivamup4545@gmail.com',
            to:email,
            subject:'Reset Password',
            html:`<p> click link </p> <p>${process.env.CLINT_URL}/resetpassword/${user._id}/${token}</p> `
        }
        
        nodemailer(templateEmail)
        return res.status(200).json({message:'check your email'})

        } catch (error) {
            res.status(400).json({message:error.message})
        } 
    }

    exports.resetPasswordLink=async(req,res)=>{
        try {
            let token = req.params.token
            let decode = jwt.decode(token)
            if(decode._id!==req.params._id) return res.status(401).json({message:'not valid user'})
            const {password} = req.body
            const user =  await User.findOne({resetPasswordLink:req.params.token})
            if(!user)
            {
                res.json('not user')
            }
            console.log(user)
            if(user){
                const hashPassword = await bcrypt.hash(password,15)
                user.password = hashPassword
                await user.save()
                return res.status(200).json({message:'password change'})
            }
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }