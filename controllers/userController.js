const User = require("../models/user")

const createUser = async(req,res)=>{
    try {
        const userVal = await User.findOne({name:req.body.name});
        if(!userVal){
            await User.insertOne(req.body);
            res.status(200).json({msg:"user added successfully."})
        }res.status(400).json({msg:"user is already exits."})
    } catch (error) {
            res.status(500).json({mesg:error})

    }
}
const login= async(req,res)=>{
   const validUser = await User.findOne({"name":req.body.name,"password":req.body.password});
 
   if(validUser){
    res.status(200).json(validUser._id);
}else{
   res.status(400).json({msg:"invalid user."})

   }
}
const userList = async(req,res)=>{
    
    const userlist = await User.find({});
    res.status(200).json({msg:userlist})
}


module.exports={createUser,login,userList,}