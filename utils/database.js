import mongoose from "mongoose";

let isConnected = false;

export const connectDB = () => {
    mongoose.set('strictQuery', true)
    if(isConnected) {
        return
    }
    try{
        mongoose.connect(process.env.DATABASE_URL);
        isConnected = true;
        console.log('mongo db connected')
    } catch(err) {
        console.log(err)
    }
}