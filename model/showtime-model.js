import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
    filmId:{
        type:mongoose.Schema.ObjectId,
        ref:'film'
    },
    date:{
        type:String,
    },
    time:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    money:{
        type:String
    }
},{timestamps:true})

export default mongoose.model('showtime',showtimeSchema)