const Personal = require("../model/personal")
const path = require('path')
const User=require('../model/user')

exports.getPersonal = async(req,res)=>{
  try {
    let personal = await Personal.find()
    res.status(200).json(personal)
  } catch (error) {
      res.status(500).json({message:error.message})
  }
}

exports.getPersonalById = async(req,res)=>{
   
    try {
        let personal = await Personal.findById({_id:req.params._id})
        res.status(200).json(personal)
        console.log(personal)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.postPersonal = async(req,res)=>{
    
    let image= req.file.path
   // console.log(image)
    let users = await User.findById(req.user)
   
   // console.log(req.body.birthDate)
    try {
        let personal = new Personal({
            work:req.body.work,
            birthDate:req.body.birthDate,
            github:req.body.github,
            linkdin:req.body.linkdin,
            address: req.body.address,
            postCode:req.body.postCode,
            country:req.body.country,
            profile:req.body.profile,
            image:image
        })
        await personal.save()
        if(users.personal.length>=1) return res.status(422).json({message:"details exists"})
        users.personal.push(personal._id)
        await users.save()
        res.status(200).json(personal)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.putPersonal = async(req,res)=>{
    
    try {
        let personal = await Personal.findByIdAndUpdate({_id:req.params._id},{
            work:req.body.work,
            birthDate:req.body.birthDate,
            github:req.body.github,
            linkdin:req.body.linkdin,
            address: req.body.address,
            postCode:req.body.postCode,
            country:req.body.country,
            profile:req.body.profile,
            image:req.file.path
        },{new:true})
        await personal.save()
        res.status(200).json(personal)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}