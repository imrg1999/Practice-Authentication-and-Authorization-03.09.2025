import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectAuthDB = async() => {
    try{
    const setUp = await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB is Connected");
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    } 
}