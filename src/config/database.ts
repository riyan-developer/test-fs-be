import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const { connection } = await mongoose.connect(process.env.MONGO_URL!);
      console.log(`MongoDB connected ${connection.host}`);
    } catch (err) {
      console.log(err);
      process.exit();
    }
};

export default connectDB;