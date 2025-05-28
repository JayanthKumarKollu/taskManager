const User = require("../models/user");
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/auth");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async(req,res)=>{
    try {
        const userVal = await User.findOne({name:req.body.name});
        if(!userVal){
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password,salt);

            await User.create({'name':req.body.name,'email':req.body.email,'password':hashPass});
            res.status(200).json("user added successfully.")
        }else{res.status(400).json("user is already exits.")}
    } catch (error) {
            res.status(500).json({mesg:error})

    }
}
const login= async(req,res)=>{
   const validUser = await User.findOne({"name":req.body.name});
 
   if(validUser){
    const isValidPass = await bcrypt.compare(req.body.password,validUser.password);
    if(!isValidPass) return res.status(400).json("Invalid credentials");

    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
    res.status(200).json({token,id:validUser._id});
}else{
   res.status(400).json("invalid user.")

   }
}
const userList = async(req,res)=>{
    
    const userlist = await User.find({});
    res.status(200).json({msg:userlist})
}


module.exports={createUser,login,userList}