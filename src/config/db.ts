import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB Connected");
    } catch (error) {
        console.log('error');
        process.exit();
    }
}


export default connectDB;