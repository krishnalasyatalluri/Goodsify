const mongoose=require('mongoose')
const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
require('dotenv').config();
const PORT=process.env.PORT
const configureDB=require('./configureDB/db')
const userRouter=require('./routes/userRoutes')
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
configureDB()
app.use('/user',userRouter)
app.listen(PORT,()=>{
    console.log('server running on',PORT)
})

