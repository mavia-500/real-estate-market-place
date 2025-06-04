import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.routes.js"
dotenv.config({path:'../.env'});

const app =express();
mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to db')
}).catch((error)=>{
    console.log("eroor",error)
})


app.use(express.json());

const port=3000

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})



app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
const statusCode=err.statusCode || 500
const message=err.message || 'internal server error'
return res.status(statusCode).json({
    success:false,
    statusCode:statusCode,
message,
})
})