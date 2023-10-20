import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true
        });
        console.log(`Connected to Mongodb database ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongoose:${error} `)
    }
}

export default connectDB;
