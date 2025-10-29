import mongoose from "mongoose";
const mongoUrl = process.env.mongo_url;

export const connectDB = async () => {
  try {
    return await mongoose.connect(mongoUrl as string);
  } catch (error) {
    console.log(`Mongo Url not Found Err:${error}`);
  }
};
