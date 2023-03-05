import { chats } from './data/data';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import router from './routes/routes';
dotenv.config()
connectDB()
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json())

app.get('/', (req, res) => { res.send("API is Running") })
app.use("/api", router);


app.listen(PORT, ()=>{console.log(`Server is Started on ${PORT}`);})