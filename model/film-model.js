import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    director:{
        type:String,
    },
    actors:{
        type:String
    },
    time:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    },
    image:{
        type:String
    },
    content:{
        type:String,
    },
    language:{
        type:String,
    },
    rated:{
        type:String,
    },
    trailer:{
        type:String
    }
},{timestamps:true})

export default mongoose.model('film',filmSchema)