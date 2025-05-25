
const task = require("../models/task");
const User = require("../models/user")


const getItems= async(req,res)=>{
    try {
        let id = req.params.id;
        const item = await task.find({userID:id});
        console.log(item)
        if(item.length>0){
        res.status(200).json(item)
        }
        else{
            res.status(400).json("no data found.")
        }
    } catch (error) {
            res.status(500).json({mesg:error})
    }

}
const getItemtoUpdate= async(req,res)=>{
    try {
        console.log("selected id",req.params.id)
        const item = await task.findOne({_id:req.params.id});
        console.log("selected updated id",item)
        if(item){
            res.status(200).json(item);
        }else{
            res.status(400).json("no data found.")
        }

        
    } catch (error) {
     res.status(500).json({mesg:error})
    }
}
const createItem = async (req,res)=>{
try {
    const taskItem = await task.findOne({'name':req.body.name});
    if(!taskItem){
        await task.insertOne(req.body);
        res.status(200).json({msg:"Task added Successfully."})
    }
    else{
        res.status(400).json({msg:"Task already exist."})
    }
   
} catch (error) {
    res.status(500).json({mesg:error})
}



}

const updateItem = async (req,res)=>{
   try {
    const item = await task.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
    // {new:true,runValidators:true} the use of this options are
    // new:true --> it is always create a new item and shows the updated value in postman or in output.
    // runValidators:true --> if we enter any empty value to the required fields it will throw validation for that
    if(!item){
        return  res.status(404).json({msg:"item not found"})
    }
    res.status(200).json({item})
   } catch (error) {
    res.status(500).json({mesg:error})
   }
}

const deleteItem= async (req,res)=>{
    try {
        const deltedItem = await task.findOneAndDelete({_id:req.params.id});
        if(!deltedItem)
            {
            return  res.status(404).json({msg:"item not found"})
            }
               
            res.status(200).json({deltedItem})
    } catch (error) {
        res.status(500).json({mesg:error})
    }
}

module.exports ={
    // getItemsList,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    getItemtoUpdate
}