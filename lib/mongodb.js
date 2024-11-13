import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DB,
      });
      console.log("Connected to DB");
    }
  } catch (error) {
    console.error("Connection error:", error);
  }
};
