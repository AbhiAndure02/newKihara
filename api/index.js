import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import registerRouts from './routes/register.routes.js'
import path from 'path';

dotenv.config();


mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connect to mongodb")
})
.catch((e)=>{
    console.log(e)
})
const __dirname = path.resolve();

const app = express();


app.use(express.json());
app.use(cookieParser());

const Port = 3000 || process.env.PORT

app.listen(Port, () =>{
    console.log(`server is running on ${Port} port `)
});

app.use('/api/auth', authRoutes)
app.use('/api', registerRouts);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode: 500,
        message
    });
});