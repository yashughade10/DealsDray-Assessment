import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${dbInstance.connection.host}`);
    } catch (error) {
        console.error(`Connection failed while connectong to DB: ${error.message}`);
    }
}

export { connectDB }