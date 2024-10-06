import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Episode } from './episodeModel.js'
import { Cast } from './castModel.js'


const app = express()
app.use(express.json())
app.use(cors())
let uri = 'mongodb+srv://prompttest123:antonprince95@cluster0.asiy8fr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri).then(()=>{
    console.log("DB connected")
    app.listen(5000,()=>{
        console.log("App running at 5000")
    })
}).catch((error)=>console.log(error))

//to get all episodes

app.get('/', async (req,res)=>{
    console.log("hello")
    return res.status(200).json({message:"hello"})
})

app.get('/get_episodes', async(req,res)=>{
    try {
        const episodes = await Episode.find({})
       return  res.status(200).json(episodes)
    } catch (error) {
        console.log(error)
    }
})

//fetches episode by season and episode number
app.get('/episode/:season/:number', async(req,res)=>{
    try {
        const {season, number} = req.params
        const episode = await Episode.findOne({season:season, number:number})
        if(episode)
            return res.status(200).json(episode)
    } catch (error) {
            console.log(error)
    }   
  
})

//POST API to pust episode details in the database, just for my convenience
app.post('/update', async(req,res)=>{
    try {
    const {season,number,title,short_desc,long_desc,air_date,comments}=req.body
    const episode = {season,number,title,short_desc,long_desc,air_date,comments}
    await Episode.create(episode)
    return res.status(200).json({message:"Successfully created"})
    } catch (error) {
        console.log(error)
    }
})

//adds comment to backend
app.post('/add_comment', async(req,res)=>{
    try {
        const id = req.body._id
        const {comment}=req.body
    
        const ep = await Episode.findOneAndUpdate({_id: id}, {$push: {comments: comment}},  { new: true, useFindAndModify: false })
        res.status(200).json({message:"Added successfully"})
    } catch (error) {
        console.log(error)
    }
   
})

//fetches cast details
app.get('/cast_details', async (req,res)=>{
    try {
        const result = await Cast.find({})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
})

