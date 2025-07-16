import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const mongoURL = 'mongodb://127.0.0.1:27017/tomato';

// const mongoURL  = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@tomato.iffgl.mongodb.net/?retryWrites=true&w=majority&appName=tomato`;
const mongoURL  = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@tomato.xxfgzxm.mongodb.net/?retryWrites=true&w=majority&appName=tomato`;


export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);  
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);  
    }
};
