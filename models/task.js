const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    // name:String,
    name:{
        required:[true,"Name is required"],
        type:String,
        trim:true,
        minlength:[3, "Name should be more than 3 characters."],
        maxlength:[20, "Name should be less than 20 characters."]

    },
    completed:{
        type:Boolean,
        default:false
    },
       userID:
            {type:mongoose.Schema.Types.ObjectId,
            ref:"userCollections"
    },
    deadline:{
type:Date
    },
    isNotificationSent:{
        type:Boolean,
        default:false
    }
    
});


module.exports = mongoose.model("TaskCollection",taskSchema);