import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    filmId:{
        type:mongoose.Schema.ObjectId,
        ref:'film'
    },
    seats:[
        {name:String}
    ],
    total:{
        type:String
    },
},{timestamps:true})

export default mongoose.model('order',orderSchema)