const mongoose=require("mongoose");
// const connectURL="mongodb://localhost:27017/taskManager";

const connectToDB =(url)=>{
    return mongoose.connect(url)
    
}
module.exports = connectToDB
