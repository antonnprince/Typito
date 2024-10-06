import mongoose, { mongo } from "mongoose";


const episodeSchema = mongoose.Schema({
    season:{
        type:Number,
        required:true,
    },
    number:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    short_desc:{
        type:String,
        required:true
    },

    long_desc:{
        type:String,
        required:true
    },

    air_date:{
        type:String,
        required:true
    },

    comments:{
        type:[String]
    }
})

export const Episode = mongoose.model("episodes",episodeSchema)