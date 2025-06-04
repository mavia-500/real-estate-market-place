import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.routes.js"
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



app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)