import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
    }
})

export const adminModel = new mongoose.model("admin",userSchema)