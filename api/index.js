import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'

dotenv.config();


mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connect to mongodb")
})
.catch((e)=>{
    console.log(e)
})

const app = express();
app.use(express.json());
app.use(cookieParser());



app.listen(3001, () =>{
    console.log("server is running on 3000 port ")
});

app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode: 500,
        message
    });
});