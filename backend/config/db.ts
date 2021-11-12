import mongoose, { Mongoose } from "mongoose";

const connectDb = async () => {
    try {
        const mongooseConnection: Mongoose = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${mongooseConnection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;