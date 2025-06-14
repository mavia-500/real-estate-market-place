import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.routes.js"
import listingRouter from './routes/listing.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config({path:'../.env'});

const app =express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to db')
}).catch((error)=>{
    console.log("eroor",error)
})



const port=3000

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})



app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)

app.use((err,req,res,next)=>{
const statusCode=err.statusCode || 500
const message=err.message || 'internal server error'
return res.status(statusCode).json({
    success:false,
    statusCode:statusCode,
message,
})
})