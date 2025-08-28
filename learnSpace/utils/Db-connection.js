import mongoose from "mongoose";
const mongoUrl = process.env.mongo_url;

export const connectDB = async () => {
  return await mongoose.connect(mongoUrl);
};
