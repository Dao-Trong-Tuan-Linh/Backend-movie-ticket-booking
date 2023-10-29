import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    level:{
        type:Number,
    },
    order:{
        type:Number,
    },
    parentID:{
        type:String,
    },
    link:{
        type:String,
    }
})

export default mongoose.model('menu',menuSchema)