import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import registerRouts from './routes/register.routes.js'
import path from 'path'

dotenv.config();


mongoose.connect("mongodb+srv://abhiandure123:techinfosync@techinfosync.rcznby2.mongodb.net/?retryWrites=true&w=majority&appName=techinfosync")
.then(()=>{
    console.log("connect to mongodb")
})
.catch((e)=>{
    console.log(e)
})

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/fronted/dist')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'fronted', 'dist', 'index.html'))
})

app.use(express.json());
app.use(cookieParser());



app.listen(3001, () =>{
    console.log("server is running on 3001 port ")
});

app.use('/api/auth', authRoutes)
app.use('/api', registerRouts);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode: 500,
        message
    });
});