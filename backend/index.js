import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({path:'../.env'});


mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to db')
}).catch((error)=>{
    console.log("eroor",error)
})

const app =express();
const port=3000

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})


