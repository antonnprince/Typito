import mongoose from "mongoose";

const castSchema = mongoose.Schema({
    url:{
        type:String,
        required:true,
    },

    name:{
        type:String,
        required:true
    },

    bio:{
        type:String,
        required:true
    }
})

export const Cast = mongoose.model("cast", castSchema)