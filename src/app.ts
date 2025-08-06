import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import route from './routes/userroutes'
dotenv.config();
const PORT=5000
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
const url=process.env.MONGO_URL
if(!url){
    throw new Error("can not find mongo url")
}
mongoose.connect(url)
.then(()=>{
    console.log("server is connected to the database")
})
.catch((error)=>{
    console.log("error"+error)
})
//morgan
app.get("/",(req,res)=>{
    res.send("hello this is from morgan")
})

app.use("/user",route)
app.listen(PORT,()=>{
    console.log(`server is running on the ${PORT}`)
})