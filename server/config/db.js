import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("✅ Database connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

export default connectDB;
